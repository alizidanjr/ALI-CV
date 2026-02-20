import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function WelcomeApp() {
    return (
        <div className="h-full w-full bg-white text-zinc-950 font-mono p-6 overflow-hidden flex flex-col">
            <div className="mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold mb-2">👋 Welcome to AliOS!</h1>
                <p className="text-zinc-600">Creative Technology Ecosystem v1.0.0</p>
            </div>

            <ScrollArea className="flex-1 pr-4">
                <div className="space-y-6 text-sm md:text-base leading-relaxed">
                    <section>
                        <h2 className="text-lg font-bold mb-2 text-teal-700">What is this?</h2>
                        <p>
                            You've landed on my interactive portfolio — a creative experiment that goes beyond
                            static resumes. This <strong>desktop OS environment</strong> showcases the intersection
                            of code, design, and storytelling, built with <strong>Next.js 15</strong>,
                            <strong> TypeScript</strong>, and <strong>Framer Motion</strong>.
                        </p>
                        <p className="mt-3">
                            As a <strong>Creative Technology Director</strong>, I believe digital experiences
                            should inspire, not just function. This portfolio embodies that philosophy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-2 text-teal-700">How to navigate?</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Desktop Icons:</strong> Double-click (or single touch) to open apps like
                                About, Projects, Terminal, and more.
                            </li>
                            <li>
                                <strong>Taskbar:</strong> Use the "Start" button to access the menu, or click
                                app tabs to toggle windows.
                            </li>
                            <li>
                                <strong>Windows:</strong> Drag, minimize, and close windows just like a real OS.
                            </li>
                            <li>
                                <strong>Terminal:</strong> Type <code className="bg-zinc-100 px-1 rounded">help</code> to
                                discover hidden commands and easter eggs!
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-2 text-teal-700">Quick Links</h2>
                        <p>
                            Download my resume from the desktop, explore my <strong>Projects</strong> to see
                            what I've built, or check the <strong>Terminal</strong> for direct GitHub/LinkedIn links.
                        </p>
                    </section>

                    <div className="mt-8 p-4 bg-zinc-100 rounded-lg border border-zinc-200">
                        <p className="font-semibold text-center italic">
                            "Technology should amplify creativity, not replace it."
                        </p>
                        <p className="text-xs text-center text-muted-foreground mt-1">
                            — My Creative Philosophy
                        </p>
                    </div>

                    <div className="h-4" /> {/* Spacer */}
                </div>
            </ScrollArea>
        </div>
    )
}
