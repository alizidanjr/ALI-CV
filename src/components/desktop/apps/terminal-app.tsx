"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDesktop } from '@/components/desktop/desktop-context'

interface Command {
    input: string
    output: React.ReactNode
}

export function TerminalApp() {
    const { resume, pdfUrl } = useDesktop()
    const [history, setHistory] = useState<Command[]>([
        { input: '', output: 'Welcome to AliOS v1.0.0\nType "help" to see available commands.' }
    ])
    const [input, setInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
        inputRef.current?.focus()
    }, [history])

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase()
        let output: React.ReactNode = ''

        switch (trimmed) {
            case 'help':
                output = (
                    <div className="space-y-1">
                        <p>Available commands:</p>
                        <p className="pl-4 text-green-400">about           - Display information about me</p>
                        <p className="pl-4 text-green-400">creative-vision - My creative philosophy</p>
                        <p className="pl-4 text-green-400">projects        - List my projects</p>
                        <p className="pl-4 text-green-400">contact         - Show contact info</p>
                        <p className="pl-4 text-green-400">resume          - Download my resume PDF</p>
                        <p className="pl-4 text-green-400">github          - Open GitHub profile</p>
                        <p className="pl-4 text-green-400">linkedin        - Open LinkedIn profile</p>
                        <p className="pl-4 text-green-400">coffee          - ☕ Take a break</p>
                        <p className="pl-4 text-green-400">clear           - Clear the terminal</p>
                        <p className="pl-4 text-green-400">whoami          - Display current user</p>
                    </div>
                )
                break
            case 'about':
                output = `${resume.personal.name} | ${resume.personal.title} & ${resume.personal.subtitle}\n` +
                    `Currently at ${resume.experience[0]?.company ?? '—'}.\n` +
                    `${resume.about.summary}`
                break
            case 'creative-vision':
                output = "🎨 Creative Philosophy:\n\n" +
                    `"${resume.about.philosophy}"\n\n` +
                    `${resume.about.vision}\n\n` +
                    "Every line of code is an opportunity to tell a story. 🚀"
                break
            case 'projects': {
                const list = resume.projects.map(p => `🌟 ${p.title} - ${p.description}`).join('\n')
                output = `Featured Projects:\n\n${list}\n\nOpen the 'Projects Explorer' app for full details!`
                break
            }
            case 'contact':
                output = `📧 Email: ${resume.personal.email}\n` +
                    `📱 Phone: ${resume.personal.phone}\n` +
                    `🔗 LinkedIn: ${resume.personal.links.linkedin.replace(/^https?:\/\//, '')}\n` +
                    `💻 GitHub: ${resume.personal.links.github.replace(/^https?:\/\//, '')}\n` +
                    `📍 Location: ${resume.personal.location}`
                break
            case 'resume':
                output = "📄 Downloading resume...\n\n" +
                    "Click the Resume icon on desktop or use:\n" +
                    pdfUrl
                // Trigger download
                setTimeout(() => {
                    const link = document.createElement('a')
                    link.href = pdfUrl
                    link.download = `${resume.personal.name} Resume.pdf`
                    link.click()
                }, 500)
                break
            case 'github':
                output = "🚀 Opening GitHub profile...\n" +
                    resume.personal.links.github
                setTimeout(() => window.open(resume.personal.links.github, '_blank'), 500)
                break
            case 'linkedin':
                output = "💼 Opening LinkedIn profile...\n" +
                    resume.personal.links.linkedin
                setTimeout(() => window.open(resume.personal.links.linkedin, '_blank'), 500)
                break
            case 'coffee':
                output = (
                    <div className="font-mono">
                        <pre className="text-amber-600">{`
    ( (
     ) )
  .______.
  |      |]
  \\      /
   \`----'
                        `}</pre>
                        <p className="text-center mt-2">☕ Take a break! You&apos;ve earned it.</p>
                    </div>
                )
                break
            case 'whoami':
                output = `ali_hassan@portfolio:~$ ${resume.personal.title}`
                break
            case 'clear':
                setHistory([])
                return
            case '':
                output = ''
                break
            default:
                output = `Command not found: ${trimmed}\nType 'help' for available commands`
        }

        setHistory(prev => [...prev, { input: cmd, output }])
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input)
            setInput('')
        }
    }

    return (
        <div className="h-full bg-black text-green-500 font-mono text-sm p-4" onClick={() => inputRef.current?.focus()}>
            <ScrollArea className="h-full w-full" viewportRef={scrollRef}>
                <div className="space-y-2">
                    {history.map((entry, i) => (
                        <div key={i} className="space-y-1">
                            {entry.input && (
                                <div className="flex items-center">
                                    <span className="text-blue-400 mr-2">➜</span>
                                    <span className="text-yellow-400 mr-2">~</span>
                                    <span>{entry.input}</span>
                                </div>
                            )}
                            <div className="whitespace-pre-wrap text-foreground/90">{entry.output}</div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center mt-2">
                    <span className="text-blue-400 mr-2">➜</span>
                    <span className="text-yellow-400 mr-2">~</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none border-none text-foreground"
                        autoFocus
                    />
                </div>
            </ScrollArea>
        </div>
    )
}
