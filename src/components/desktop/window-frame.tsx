"use client"

import React, { useRef } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { X, Minus, Square } from 'lucide-react'
import { useDesktop, AppId } from './desktop-context'
import { cn } from '@/lib/utils'

interface WindowFrameProps {
    id: AppId
    children: React.ReactNode
    initialPosition?: { x: number; y: number }
    className?: string
}

export function WindowFrame({ id, children, initialPosition = { x: 100, y: 50 }, className }: WindowFrameProps) {
    const { windows, closeWindow, minimizeWindow, focusWindow, activeWindowId } = useDesktop()
    const windowState = windows[id]
    const dragControls = useDragControls()
    const constraintsRef = useRef(null)

    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (!windowState.isOpen) return null

    const isActive = activeWindowId === id

    return (
        <motion.div
            drag={!isMobile}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0, x: isMobile ? 0 : initialPosition.x, y: isMobile ? 0 : initialPosition.y }}
            animate={{
                scale: windowState.isMinimized ? 0 : 1,
                opacity: windowState.isMinimized ? 0 : 1,
                x: isMobile ? 0 : undefined, // Force 0 on mobile, leave undefined to keep drag position on desktop
                y: isMobile ? 0 : undefined,
                transition: { duration: 0.2 }
            }}
            style={{ zIndex: windowState.zIndex }}
            onPointerDown={() => focusWindow(id)}
            className={cn(
                "absolute flex flex-col bg-background border shadow-xl rounded-lg overflow-hidden",
                // Base styles (Mobile & Desktop start at top-left)
                "top-0 left-0",

                // Mobile specific
                "w-full h-[calc(100vh-48px)] rounded-none border-0",

                // Desktop specific (md)
                "md:w-[800px] md:h-[500px] md:rounded-lg md:border",
                "md:max-w-[90vw] md:max-h-[80vh]", // Restore constraints

                isActive ? "ring-0 md:ring-2 ring-primary/20 border-primary/50" : "border-border",
                className
            )}
        >
            {/* Title Bar */}
            <div
                onPointerDown={(e) => {
                    if (window.innerWidth > 768) {
                        dragControls.start(e)
                    }
                    focusWindow(id)
                }}
                className={cn(
                    "h-10 px-4 flex items-center justify-between select-none cursor-default",
                    isActive ? "bg-muted/80" : "bg-muted/40"
                )}
            >
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{windowState.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        className="p-1 hover:bg-background/50 rounded-sm transition-colors"
                    >
                        <Minus className="h-3 w-3" />
                    </button>
                    <button
                        className="p-1 hover:bg-background/50 rounded-sm transition-colors opacity-50 cursor-not-allowed"
                    >
                        <Square className="h-3 w-3" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded-sm transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-background/95 backdrop-blur-sm relative">
                {children}
            </div>
        </motion.div>
    )
}
