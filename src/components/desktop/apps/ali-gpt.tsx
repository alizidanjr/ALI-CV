"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Loader2, Sparkles, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

const MAX_INPUT_LENGTH = 500

interface Message {
    role: 'user' | 'assistant'
    content: string
}

export function AliGPTApp() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: `Hi, I'm ALI GPT, a digital clone of Ali Hassan. Ask me anything about my work, my philosophy, or my experience as a Creative Technology Director.` }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const turnstileRef = useRef<TurnstileInstance | undefined>(undefined)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                    cfToken: token
                })
            })

            if (!response.ok) {
                if (response.status === 403) throw new Error('Cloudflare verification failed')
                throw new Error('Failed to fetch')
            }

            const reader = response.body?.getReader()
            if (!reader) throw new Error('No reader available')

            const assistantMessage: Message = { role: 'assistant', content: '' }
            setMessages(prev => [...prev, assistantMessage])

            const decoder = new TextDecoder()
            let partialContent = ''

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                partialContent += chunk

                setMessages(prev => {
                    const newMessages = [...prev]
                    newMessages[newMessages.length - 1] = {
                        role: 'assistant',
                        content: partialContent
                    }
                    return newMessages
                })
            }
        } catch (error: unknown) {
            console.error(error)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: error instanceof Error && error.message === 'Cloudflare verification failed'
                    ? "Security check failed. Please refresh and verify you're a human!"
                    : "Sorry, I'm having trouble connecting right now."
            }])
        } finally {
            setIsLoading(false)
            // Reset Turnstile token after each request (tokens are single-use)
            setToken(null)
            turnstileRef.current?.reset()
        }
    }

    return (
        <div className="flex flex-col h-full bg-zinc-950 font-sans text-zinc-200 overflow-hidden border border-teal-500/20 rounded-lg shadow-2xl shadow-teal-500/10">
            {/* Header */}
            <div className="p-4 border-b border-teal-500/20 bg-zinc-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500/10 rounded-lg">
                        <Sparkles size={20} className="text-teal-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-teal-400 uppercase tracking-widest leading-none">ALI GPT v1.0</h2>
                        <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Secure Digital Consciousness</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                        <span className="text-[10px] text-teal-500 font-medium uppercase tracking-tighter">System Online</span>
                    </div>
                    <div className="flex items-center gap-1 text-[8px] text-zinc-600 uppercase font-bold tracking-tighter">
                        <ShieldCheck size={10} className="text-blue-500" />
                        Cloudflare Managed
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-teal-500/20 scrollbar-track-transparent">
                <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-zinc-800 border border-zinc-700' : 'bg-teal-500/10 border border-teal-500/30'
                                    }`}>
                                    {m.role === 'user' ? <User size={16} className="text-zinc-400" /> : <Bot size={16} className="text-teal-400" />}
                                </div>
                                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                    ? 'bg-zinc-800 text-zinc-100 rounded-tr-none border border-zinc-700'
                                    : 'bg-zinc-900/80 text-zinc-300 rounded-tl-none border border-teal-500/10'
                                    }`}>
                                    {m.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && messages[messages.length - 1].role === 'user' && (
                    <div className="flex justify-start">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0">
                                <Loader2 size={16} className="text-teal-400 animate-spin" />
                            </div>
                            <div className="p-3 bg-zinc-900/80 rounded-2xl rounded-tl-none border border-teal-500/10">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-teal-500/50 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-teal-500/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-teal-500/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-teal-500/20 bg-zinc-900/30 backdrop-blur-md flex flex-col gap-4">
                <div className="flex justify-center scale-90 md:scale-100">
                    <Turnstile
                        ref={turnstileRef}
                        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || '1x00000000000000000000AA'}
                        onSuccess={(t) => setToken(t)}
                        options={{ theme: 'dark' }}
                    />
                </div>

                <div className="relative flex gap-2">
                    <input
                        type="text"
                        value={input}
                        maxLength={MAX_INPUT_LENGTH}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={token ? `Message ALI GPT... (${MAX_INPUT_LENGTH} char max)` : "Verifying with Cloudflare..."}
                        disabled={!token}
                        className="flex-1 bg-zinc-800/50 border border-teal-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 transition-colors placeholder:text-zinc-600 pr-16 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {input.length > 0 && (
                        <span className="absolute right-14 top-1/2 -translate-y-1/2 text-[9px] text-zinc-600 tabular-nums">
                            {input.length}/{MAX_INPUT_LENGTH}
                        </span>
                    )}
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading || !token}
                        className="absolute right-1 top-1 bottom-1 px-4 bg-teal-500 hover:bg-teal-400 disabled:bg-zinc-700 disabled:hover:bg-zinc-700 text-zinc-950 rounded-lg transition-all flex items-center justify-center font-bold"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest font-medium italic">
                    Protected by Cloudflare Edge Security
                </p>
            </div>
        </div>
    )
}
