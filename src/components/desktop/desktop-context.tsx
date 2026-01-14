"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type AppId = 'terminal' | 'projects' | 'about' | 'contact' | 'settings' | 'welcome' | 'browser'

interface WindowState {
    id: AppId
    title: string
    isOpen: boolean
    isMinimized: boolean
    zIndex: number
}

interface DesktopContextType {
    windows: Record<AppId, WindowState>
    activeWindowId: AppId | null
    openWindow: (id: AppId) => void
    closeWindow: (id: AppId) => void
    minimizeWindow: (id: AppId) => void
    focusWindow: (id: AppId) => void
    wallpaper: string
    setWallpaper: (wallpaper: string) => void
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined)

const initialWindows: Record<AppId, WindowState> = {
    welcome: { id: 'welcome', title: 'Welcome to AliOS', isOpen: true, isMinimized: false, zIndex: 2 },
    browser: { id: 'browser', title: 'Internet Browser', isOpen: false, isMinimized: false, zIndex: 0 },
    terminal: { id: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, zIndex: 1 },
    projects: { id: 'projects', title: 'Projects Explorer', isOpen: false, isMinimized: false, zIndex: 0 },
    about: { id: 'about', title: 'about_me.txt - Notepad', isOpen: false, isMinimized: false, zIndex: 0 },
    contact: { id: 'contact', title: 'Mail', isOpen: false, isMinimized: false, zIndex: 0 },
    settings: { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, zIndex: 0 },
}

export function DesktopProvider({ children }: { children: ReactNode }) {
    const [windows, setWindows] = useState<Record<AppId, WindowState>>(initialWindows)
    const [activeWindowId, setActiveWindowId] = useState<AppId | null>('terminal')
    const [maxZIndex, setMaxZIndex] = useState(10)
    const [wallpaper, setWallpaper] = useState('grid') // 'grid', 'matrix', 'waves'
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
    const [clickBuffer, setClickBuffer] = useState<AudioBuffer | null>(null)
    const lastPlayedRef = React.useRef<number>(0)

    // Initialize AudioContext and preload sounds
    useEffect(() => {
        let ctx: AudioContext | null = null
        const initAudio = async () => {
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext
                ctx = new AudioContext()
                setAudioContext(ctx)

                // Preload click sound
                const response = await fetch('/sounds/click.mp3')
                const arrayBuffer = await response.arrayBuffer()
                const decodedBuffer = await ctx.decodeAudioData(arrayBuffer)
                setClickBuffer(decodedBuffer)
            } catch (e) {
                console.error("Audio initialization failed", e)
            }
        }
        initAudio()

        return () => {
            if (ctx && ctx.state !== 'closed') {
                ctx.close()
            }
        }
    }, [])

    const playSound = (type: 'click' | 'open' | 'close' = 'click') => {
        if (!audioContext) return

        // Debounce sounds (prevent double triggers within 80ms)
        const now = Date.now()
        if (now - lastPlayedRef.current < 80) return
        lastPlayedRef.current = now

        // Resume context if suspended (browser requirement)
        if (audioContext.state === 'suspended') {
            audioContext.resume()
        }

        try {
            if (type === 'click' && clickBuffer) {
                const source = audioContext.createBufferSource()
                source.buffer = clickBuffer

                // Create a gain node for volume control
                const gainNode = audioContext.createGain()
                gainNode.gain.value = 0.5 // 50% volume

                source.connect(gainNode)
                gainNode.connect(audioContext.destination)

                source.start(0)
            }
        } catch (e) {
            console.error("Audio play failed", e)
        }
    }

    const focusWindow = (id: AppId) => {
        playSound('click')
        setActiveWindowId(id)
        setMaxZIndex(prev => prev + 1)
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], zIndex: maxZIndex + 1, isMinimized: false }
        }))
    }

    const openWindow = (id: AppId) => {
        playSound('open')
        // Atomic update to ensure isOpen and zIndex are set together
        setActiveWindowId(id)
        setMaxZIndex(prev => prev + 1)
        setWindows(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                isOpen: true,
                isMinimized: false,
                zIndex: maxZIndex + 1
            }
        }))
    }

    const closeWindow = (id: AppId) => {
        playSound('close')
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false }
        }))
        if (activeWindowId === id) {
            setActiveWindowId(null)
        }
    }

    const minimizeWindow = (id: AppId) => {
        playSound('click')
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isMinimized: true }
        }))
        if (activeWindowId === id) {
            setActiveWindowId(null)
        }
    }

    return (
        <DesktopContext.Provider value={{ windows, activeWindowId, openWindow, closeWindow, minimizeWindow, focusWindow, wallpaper, setWallpaper }}>
            {children}
        </DesktopContext.Provider>
    )
}

export function useDesktop() {
    const context = useContext(DesktopContext)
    if (context === undefined) {
        throw new Error('useDesktop must be used within a DesktopProvider')
    }
    return context
}
