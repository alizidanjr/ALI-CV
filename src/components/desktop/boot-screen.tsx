"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BootScreenProps {
    onComplete: () => void
}

export function BootScreen({ onComplete }: BootScreenProps) {
    const [lines, setLines] = useState<string[]>([])
    const [progress, setProgress] = useState(0)

    const bootText = [
        "BIOS Date 01/15/25 14:22:51 Ver: 1.0.0",
        "CPU: Intel(R) Core(TM) i9-14900K CPU @ 6.00GHz",
        "Memory Test: 65536K OK",
        "Detecting Primary Master ... Ali Hassan Portfolio",
        "Detecting Primary Slave ... CV Data",
        "Booting from Hard Disk...",
        "Loading Kernel...",
        "Initializing Graphics System...",
        "Mounting File System...",
        "Starting Desktop Environment...",
        "Welcome to AliOS v1.0"
    ]

    useEffect(() => {
        let currentLine = 0
        const textInterval = setInterval(() => {
            if (currentLine < bootText.length) {
                setLines(prev => [...prev, bootText[currentLine]])
                currentLine++
            } else {
                clearInterval(textInterval)
            }
        }, 400)

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    setTimeout(onComplete, 800)
                    return 100
                }
                return prev + 2
            })
        }, 50)

        return () => {
            clearInterval(textInterval)
            clearInterval(progressInterval)
        }
    }, [onComplete])

    return (
        <div
            onClick={onComplete}
            className="fixed inset-0 bg-black text-green-500 font-mono p-8 z-[100] overflow-hidden flex flex-col justify-between cursor-pointer"
        >
            <div className="space-y-2">
                {lines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {line}
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-3 h-5 bg-green-500 inline-block ml-1"
                />
            </div>

            <div className="w-full max-w-xl mx-auto mb-20 pointer-events-none">
                <div className="flex justify-between text-sm mb-2">
                    <span>LOADING SYSTEM</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-4 border-2 border-green-900 p-0.5">
                    <div
                        className="h-full bg-green-500 transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-center text-xs opacity-50 mt-2 text-green-700 animate-pulse">
                    Click anywhere to skip...
                </p>
            </div>
        </div>
    )
}
