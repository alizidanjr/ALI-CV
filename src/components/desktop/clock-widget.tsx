import React, { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"

export function ClockWidget() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const secondsRotation = time.getSeconds() * 6
    const minutesRotation = (time.getMinutes() * 6) + (time.getSeconds() * 0.1)
    const hoursRotation = (time.getHours() * 30) + (time.getMinutes() * 0.5)

    return (
        <Card className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative shadow-2xl select-none pointer-events-none md:pointer-events-auto">
            {/* Clock Face Markers */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-3 bg-white/50 rounded-full"
                    style={{
                        transform: `rotate(${i * 30}deg) translateY(-85px)`,
                    }}
                />
            ))}

            {/* Hour Hand */}
            <div
                className="absolute w-1.5 h-12 bg-white rounded-full origin-bottom"
                style={{
                    transform: `rotate(${hoursRotation}deg) translateY(-50%)`,
                    bottom: '50%'
                }}
            />

            {/* Minute Hand */}
            <div
                className="absolute w-1 h-16 bg-white/80 rounded-full origin-bottom"
                style={{
                    transform: `rotate(${minutesRotation}deg) translateY(-50%)`,
                    bottom: '50%'
                }}
            />

            {/* Second Hand */}
            <div
                className="absolute w-0.5 h-20 bg-teal-400 rounded-full origin-bottom shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                style={{
                    transform: `rotate(${secondsRotation}deg) translateY(-20%)`,
                    bottom: '50%'
                }}
            />

            {/* Center Dot */}
            <div className="absolute w-3 h-3 bg-teal-500 rounded-full shadow-lg z-10" />

            {/* Date Display */}
            <div className="absolute top-28 text-xs font-mono text-white/70 bg-black/20 px-2 py-0.5 rounded">
                {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </div>
        </Card>
    )
}
