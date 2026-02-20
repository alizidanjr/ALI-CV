"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

export function Contact() {
    return (
        <section id="contact" className="w-full py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-2xl mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Get in Touch</CardTitle>
                        <CardDescription>
                            Have a project in mind or just want to say hi? Send me a message!
                        </CardDescription>
                        <div className="mt-4 flex flex-col items-center space-y-2 text-sm text-muted-foreground">
                            <p>alihassancut@gmail.com</p>
                            <p>+20 106 550 3400</p>
                            <a href="https://linkedin.com/in/alizidanjr" target="_blank" rel="noreferrer" className="hover:text-primary underline">
                                linkedin.com/in/alizidanjr
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Input placeholder="Name" />
                                </div>
                                <div className="space-y-2">
                                    <Input type="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Textarea placeholder="Message" className="min-h-[120px]" />
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    )
}
