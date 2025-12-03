"use client"

import React from 'react'
import { DesktopProvider } from './desktop-context'
import { Taskbar } from './taskbar'
import { DesktopIcon } from './desktop-icon'
import { WindowFrame } from './window-frame'
import { TerminalApp } from './apps/terminal-app'
import { ProjectsApp, AboutApp, ContactApp } from './apps/wrappers'
import { SettingsApp } from './apps/settings-app'
import { useDesktop } from './desktop-context'

import { BootScreen } from './boot-screen'

function DesktopContent() {
    const { wallpaper } = useDesktop()

    return (
        <div className="fixed inset-0 overflow-hidden bg-zinc-950 text-zinc-50 selection:bg-teal-500/30">
            {/* Dynamic Background */}
            {wallpaper === 'grid' && (
                <>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#3b82f615,transparent)]" />
                </>
            )}
            {wallpaper === 'matrix' && (
                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm95bDN3YnF6Y3J6Y3J6Y3J6Y3J6Y3J6Y3J6Y3J6Y3J6Y3J6/eIm6jGcQ01E9Dxc/giphy.gif')] bg-cover opacity-20" />
            )}
            {wallpaper === 'waves' && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-teal-900/20 animate-pulse" />
            )}

            {/* Desktop Icons Area */}
            <div className="relative z-10 p-4 grid grid-cols-3 md:grid-flow-col md:grid-rows-[repeat(auto-fill,100px)] gap-4 w-full md:w-fit h-fit md:h-[calc(100vh-48px)] justify-items-center md:justify-items-start">
                <DesktopIcon id="terminal" label="Terminal" />
                <DesktopIcon id="projects" label="Projects" />
                <DesktopIcon id="about" label="About Me" />
                <DesktopIcon id="contact" label="Contact" />
                <DesktopIcon id="settings" label="Settings" />

                {/* Resume Download Icon */}
                <a
                    href="/Ali Hassan CV 2025.docx"
                    download
                    className="group flex flex-col items-center justify-center w-24 h-24 rounded-lg hover:bg-white/10 focus:bg-white/20 focus:outline-none transition-colors space-y-2"
                >
                    <div className="p-3 bg-background/50 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                    </div>
                    <span className="text-xs font-medium text-foreground/90 px-2 py-1 rounded bg-background/40 backdrop-blur-sm shadow-sm group-hover:bg-background/60">
                        Resume
                    </span>
                </a>
            </div>

            {/* Windows */}
            <WindowFrame id="terminal" initialPosition={{ x: 100, y: 50 }}>
                <TerminalApp />
            </WindowFrame>
            <WindowFrame id="projects" initialPosition={{ x: 150, y: 80 }}>
                <ProjectsApp />
            </WindowFrame>
            <WindowFrame id="about" initialPosition={{ x: 200, y: 110 }}>
                <AboutApp />
            </WindowFrame>
            <WindowFrame id="contact" initialPosition={{ x: 250, y: 140 }}>
                <ContactApp />
            </WindowFrame>
            <WindowFrame id="settings" initialPosition={{ x: 300, y: 170 }}>
                <SettingsApp />
            </WindowFrame>

            <Taskbar />
        </div>
    )
}

export function Desktop() {
    const [isBooted, setIsBooted] = React.useState(false)

    if (!isBooted) {
        return <BootScreen onComplete={() => setIsBooted(true)} />
    }

    return (
        <DesktopProvider>
            <DesktopContent />
        </DesktopProvider>
    )
}
