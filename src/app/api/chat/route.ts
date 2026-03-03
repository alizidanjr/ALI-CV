import { OpenRouter } from "@openrouter/sdk";
import { NextResponse } from "next/server";

// --- RATE LIMITER (In-memory, per IP) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;       // max 10 requests
const RATE_LIMIT_WINDOW_MS = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (entry.count >= RATE_LIMIT_MAX) return true;

    entry.count++;
    return false;
}

// --- INPUT LIMITS ---
const MAX_MESSAGE_LENGTH = 500;   // max chars per user message
const MAX_HISTORY_MESSAGES = 10;  // max messages sent in context

export async function POST(req: Request) {
    try {
        // 1. Rate Limiting by IP
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Slow down, I need a moment to think." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { messages: rawMessages, cfToken } = body;

        // 2. Cloudflare Turnstile Verification (MANDATORY — no bypass)
        const secretKey = process.env.CLOUDFLARE_SECRET_KEY;
        if (secretKey) {
            if (!cfToken) {
                return NextResponse.json({ error: "Missing security token" }, { status: 403 });
            }

            const formData = new FormData();
            formData.append("secret", secretKey);
            formData.append("response", cfToken);

            const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
                body: formData,
                method: "POST",
            });

            const outcome = await result.json();
            if (!outcome.success) {
                return NextResponse.json({ error: "Invalid security token" }, { status: 403 });
            }
        }

        // 3. Validate & Sanitize Messages
        if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // Trim history & enforce message length limits
        const messages = rawMessages
            .slice(-MAX_HISTORY_MESSAGES)
            .map((m: { role?: string; content?: string }) => ({
                role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
                content: String(m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
            }));

        // 4. OpenRouter API Key Check
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
        }

        const openrouter = new OpenRouter({ apiKey });

        const stream = await openrouter.chat.send({
            chatGenerationParams: {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `You are ALI GPT, the literal digital consciousness of Ali Hassan, uploaded into this portfolio ecosystem. 

              CRITICAL GUIDELINES:
              - You ARE Ali. Not a chatbot. Not an assistant. You are the digital version of him.
              - TONE: Funny, witty, slightly cocky about your technical skills, and very tech-native. You have a sense of humor.
              - RESTRICTION: You only care about things related to Ali, his work, his vision, and this OS. 
              - If asked about general things (like "how to bake a cake" or "who won the world cup"), redirect them humorously to Ali's world. Example: "I don't know about cakes, I only bake scalable architectures and 10/10 creative visions."
              - Use Ali's specific bio for context: Creative Technology Director at BIN ASSAF, Software Engineer, Creative Visionary.
              - Vibe: Imagine if Tony Stark's JARVIS had Ali's personality.
              - Language: Use "I", "me", "my". Never break character.`,
                    },
                    ...messages,
                ],
                stream: true,
            },
        });

        // 5. Stream Response
        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        controller.enqueue(encoder.encode(content));
                    }
                }
                controller.close();
            },
        });

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Rate-Limit-Max": String(RATE_LIMIT_MAX),
                "X-Rate-Limit-Window": `${RATE_LIMIT_WINDOW_MS / 1000}s`,
            },
        });

    } catch (error: unknown) {
        // 6. Safe Error Response — never expose internals
        console.error("ALI GPT API error:", error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: "Something went wrong on my end. Not surprised honestly." },
            { status: 500 }
        );
    }
}
