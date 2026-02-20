"use client"

import { useDesktop } from "../desktop-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Grid, Waves, Code } from "lucide-react"
import { cn } from "@/lib/utils"

export function SettingsApp() {
    const { wallpaper, setWallpaper } = useDesktop()

    const wallpapers = [
        { id: 'grid', name: 'Retro Grid', icon: Grid, description: 'Classic blueprint style' },
        { id: 'matrix', name: 'Matrix Rain', icon: Code, description: 'Digital rain effect' },
        { id: 'waves', name: 'Abstract Waves', icon: Waves, description: 'Calm gradient waves' },
    ]

    return (
        <div className="h-full bg-background p-6 overflow-auto">
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-muted-foreground">Customize your desktop experience.</p>
                </div>

                <section>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Monitor className="h-5 w-5" />
                        Wallpaper
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {wallpapers.map((wp) => (
                            <Card
                                key={wp.id}
                                className={cn(
                                    "cursor-pointer transition-all hover:border-primary/50",
                                    wallpaper === wp.id ? "border-primary ring-2 ring-primary/20" : ""
                                )}
                                onClick={() => setWallpaper(wp.id)}
                            >
                                <CardHeader className="p-4">
                                    <div className="w-full aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
                                        <wp.icon className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <CardTitle className="text-base">{wp.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-xs text-muted-foreground">{wp.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
