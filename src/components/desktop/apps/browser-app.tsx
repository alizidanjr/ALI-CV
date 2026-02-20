import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, RotateCw, Globe, Search, Star } from 'lucide-react'

export function BrowserApp() {
    const [url, setUrl] = useState('https://start.alios.dev')
    const [isLoading, setIsLoading] = useState(false)

    const bookmarks = [
        { name: 'GitHub', url: 'https://github.com/alizidanjr', icon: 'Github' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/alizidanjr', icon: 'Linkedin' },
        { name: 'Portfolio', url: 'https://ali-hassan.dev', icon: 'User' },
    ]

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)

        // Simple mock behavior: if it's a real URL, "go" there (in new tab for safety), 
        // otherwise search google
        if (url.includes('.') && !url.includes(' ')) {
            window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
        } else {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(url)}`, '_blank')
        }
    }

    return (
        <div className="h-full flex flex-col bg-zinc-50 text-zinc-900 font-sans">
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 border-b bg-zinc-100">
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400" disabled>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400" disabled>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-zinc-200" onClick={() => setIsLoading(true)}>
                        <RotateCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 bg-white border rounded-full px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20">
                    <Globe className="h-4 w-4 text-zinc-400" />
                    <input
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Search Google or type a URL"
                    />
                    <Star className="h-4 w-4 text-zinc-400 hover:text-yellow-400 cursor-pointer transition-colors" />
                </form>

                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">AH</div>
                </Button>
            </div>

            {/* Bookmarks Bar */}
            <div className="flex items-center gap-4 px-4 py-2 border-b bg-zinc-50 text-xs text-zinc-600">
                {bookmarks.map((bm) => (
                    <a
                        key={bm.name}
                        href={bm.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:bg-zinc-200 px-2 py-1 rounded transition-colors"
                    >
                        <img
                            src={`https://www.google.com/s2/favicons?domain=${bm.url}`}
                            alt=""
                            className="w-4 h-4"
                        />
                        {bm.name}
                    </a>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white relative overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                        <Globe className="h-24 w-24 text-zinc-900 relative z-10" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">AliOS Browser</h1>
                        <p className="text-zinc-500 max-w-sm mx-auto">
                            Secure, fast, and private browsing experience.
                            <br />
                            <span className="text-xs opacity-70">(Simulated Environment)</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
                        {[
                            { name: 'GitHub', url: 'https://github.com/alizidanjr', color: 'bg-zinc-900' },
                            { name: 'LinkedIn', url: 'https://linkedin.com/in/alizidanjr', color: 'bg-blue-600' },
                            { name: 'Twitter', url: 'https://twitter.com', color: 'bg-sky-500' },
                            { name: 'Email', url: 'mailto:alihassancut@gmail.com', color: 'bg-red-500' },
                        ].map((site) => (
                            <a
                                key={site.name}
                                href={site.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all"
                            >
                                <div className={`h-12 w-12 rounded-full ${site.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <span className="text-lg font-bold">{site.name[0]}</span>
                                </div>
                                <span className="font-medium text-sm text-zinc-700">{site.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
