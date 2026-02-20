"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-20 md:py-32 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    Hi, I&apos;m <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Ali</span>
                </h1>
                <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground">
                    Computer Science Graduate
                </h2>
                <p className="max-w-[600px] text-lg text-muted-foreground mx-auto">
                    Building digital experiences with React, Tailwind, and Modern Web Technologies.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex space-x-4"
            >
                <Button asChild size="lg">
                    <Link href="#projects">View Projects</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="#contact">Contact Me</Link>
                </Button>
            </motion.div>
        </section>
    )
}
