"use client"

import React from 'react'
import { useDesktop, AppId } from './desktop-context'
import { cn } from '@/lib/utils'
import { Terminal, Folder, User, Mail, Settings, BookOpen, Globe } from 'lucide-react'

interface DesktopIconProps {
    id: AppId
    label: string
    icon?: React.ReactNode
}

export function DesktopIcon({ id, label }: DesktopIconProps) {
    const { openWindow } = useDesktop()

    return (
        <button
            onClick={() => openWindow(id)}
            className="group flex flex-col items-center justify-center w-24 h-24 rounded-lg hover:bg-white/10 focus:bg-white/20 focus:outline-none transition-colors space-y-2"
        >
            <div className="p-3 bg-background/50 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-200">
                {getIcon(id)}
            </div>
            <span className="text-xs font-medium text-foreground/90 px-2 py-1 rounded bg-background/40 backdrop-blur-sm shadow-sm group-hover:bg-background/60">
                {label}
            </span>
        </button>
    )
}

function getIcon(id: AppId) {
    switch (id) {
        case 'terminal': return <Terminal className="h-8 w-8 text-foreground" />
        case 'projects': return <Folder className="h-8 w-8 text-blue-500" />
        case 'about': return <User className="h-8 w-8 text-yellow-500" />
        case 'contact': return <Mail className="h-8 w-8 text-red-500" />
        case 'settings': return <Settings className="h-8 w-8 text-gray-500" />
        case 'welcome': return <BookOpen className="h-8 w-8 text-green-500" />
        case 'browser': return <Globe className="h-8 w-8 text-blue-400" />
    }
}
