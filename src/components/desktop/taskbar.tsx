"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useDesktop, AppId } from './desktop-context'
import { cn } from '@/lib/utils'
import { Monitor, Terminal, Folder, User, Mail, Settings, BookOpen, Globe } from 'lucide-react'

export function Taskbar() {
    const [isStartMenuOpen, setStartMenuOpen] = useState(false)
    const { windows, activeWindowId, openWindow, minimizeWindow, focusWindow } = useDesktop()
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Close start menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (isStartMenuOpen && !target.closest('.start-menu') && !target.closest('.start-button')) {
                setStartMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isStartMenuOpen])

    const handleTabClick = (id: AppId) => {
        const window = windows[id]
        if (window.isOpen && !window.isMinimized && activeWindowId === id) {
            minimizeWindow(id)
        } else {
            if (!window.isOpen) {
                openWindow(id)
            } else {
                focusWindow(id)
            }
        }
    }

    const handleStartClick = () => {
        setStartMenuOpen(!isStartMenuOpen)
    }

    const handleAppClick = (id: AppId) => {
        openWindow(id)
        setStartMenuOpen(false)
    }

    return (
        <>
            {/* Start Menu */}
            {isStartMenuOpen && (
                <div className="fixed bottom-12 left-2 w-64 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-t-lg rounded-br-lg shadow-2xl p-2 z-50 start-menu flex flex-col space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                        Applications
                    </div>
                    {Object.values(windows).map((app) => (
                        <Button
                            key={app.id}
                            variant="ghost"
                            className="w-full justify-start gap-3 h-10 hover:bg-white/10"
                            onClick={() => handleAppClick(app.id)}
                        >
                            {getIcon(app.id)}
                            <span>{app.title}</span>
                        </Button>
                    ))}

                    <div className="h-px bg-white/10 my-2 mx-2" />

                    <a
                        href="/Ali Hassan CV 2025.docx"
                        download
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-md transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                        <span>Download Resume</span>
                    </a>

                    <div className="h-px bg-white/10 my-2 mx-2" />

                    <div className="px-2 py-2 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center font-bold text-white text-xs">
                            AH
                        </div>
                        <div className="text-sm font-medium">Ali Hassan</div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto h-8 w-8 hover:bg-red-500/20 hover:text-red-500"
                            onClick={() => window.location.reload()}
                            title="Shutdown (Reload)"
                        >
                            <Monitor className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 h-12 bg-zinc-900/80 backdrop-blur-md border-t border-white/10 flex items-center px-2 z-50 justify-between shadow-2xl">
                <div className="flex items-center space-x-2 shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-9 gap-2 font-bold text-base hover:bg-white/10 px-2 md:px-4 start-button transition-colors",
                            isStartMenuOpen && "bg-white/10 text-teal-400"
                        )}
                        onClick={handleStartClick}
                    >
                        <Monitor className="h-5 w-5 text-teal-400" />
                        <span className="hidden md:inline">Start</span>
                    </Button>
                    <div className="h-6 w-px bg-white/10 mx-2" />
                </div>

                {/* Window Tabs */}
                <div className="flex items-center space-x-1 flex-1 overflow-x-auto no-scrollbar mask-linear-fade">
                    {Object.values(windows).filter(w => w.isOpen).map((window) => (
                        <Button
                            key={window.id}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTabClick(window.id)}
                            className={cn(
                                "h-9 px-3 min-w-[100px] md:min-w-[120px] justify-start transition-all border border-transparent shrink-0",
                                activeWindowId === window.id && !window.isMinimized
                                    ? "bg-white/10 border-white/10 shadow-inner"
                                    : "hover:bg-white/5",
                                window.isMinimized && "opacity-60"
                            )}
                        >
                            {getIcon(window.id)}
                            <span className="ml-2 truncate max-w-[80px]">{window.title}</span>
                        </Button>
                    ))}
                </div>

                {/* Clock */}
                <div className="px-4 text-sm font-medium tabular-nums">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </>
    )
}

function getIcon(id: AppId) {
    switch (id) {
        case 'terminal': return <Terminal className="h-4 w-4" />
        case 'projects': return <Folder className="h-4 w-4" />
        case 'about': return <User className="h-4 w-4" />
        case 'contact': return <Mail className="h-4 w-4" />
        case 'settings': return <Settings className="h-4 w-4" />
        case 'welcome': return <BookOpen className="h-4 w-4" />
        case 'browser': return <Globe className="h-4 w-4" />
    }
}
