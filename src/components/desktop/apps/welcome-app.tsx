import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function WelcomeApp() {
    return (
        <div className="h-full w-full bg-white text-zinc-950 font-mono p-6 overflow-hidden flex flex-col">
            <div className="mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold mb-2">👋 Welcome to AliOS!</h1>
                <p className="text-zinc-600">Version 1.0.0 (Stable)</p>
            </div>

            <ScrollArea className="flex-1 pr-4">
                <div className="space-y-6 text-sm md:text-base leading-relaxed">
                    <section>
                        <h2 className="text-lg font-bold mb-2 text-teal-700">What is this?</h2>
                        <p>
                            You've landed on my interactive portfolio. I designed this environment to be a fun,
                            immersive way to showcase my skills as a Full Stack Developer. It's built with
                            <strong> React</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-2 text-teal-700">How to navigate?</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Desktop Icons:</strong> Double-click (or single touch) icons to open apps.
                            </li>
                            <li>
                                <strong>Taskbar:</strong> Use the "Start" button to access the menu, or click open app tabs to toggle them.
                            </li>
                            <li>
                                <strong>Windows:</strong> You can drag, minimize, and close windows just like a real OS.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-2 text-teal-700">Quick Links</h2>
                        <p>
                            If you're in a hurry, you can download my resume directly from the desktop or the start menu.
                            Check out the <strong>Projects</strong> app to see what I've been working on!
                        </p>
                    </section>

                    <div className="mt-8 p-4 bg-zinc-100 rounded-lg border border-zinc-200">
                        <p className="font-semibold text-center italic">
                            "Simplicity is the soul of efficiency." – Austin Freeman
                        </p>
                    </div>

                    <div className="h-4" /> {/* Spacer */}
                </div>
            </ScrollArea>
        </div>
    )
}
