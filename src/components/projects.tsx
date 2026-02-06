"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { resumeData } from "@/data/resume-data"
import { useState } from "react"

const categories = ["All", "Creative Coding", "Web Platforms", "AI Experiments", "Game Dev", "Academic Work"] as const

export function Projects() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All")

    const filteredProjects = selectedCategory === "All"
        ? resumeData.projects
        : resumeData.projects.filter(p => p.category === selectedCategory)

    // Sort to show featured first
    const sortedProjects = [...filteredProjects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    return (
        <section id="projects" className="w-full py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Featured Projects</h2>
                <p className="text-muted-foreground mb-6">
                    Showcasing innovation at the intersection of technology and creativity
                </p>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className={`h-full flex flex-col ${project.featured ? 'ring-2 ring-teal-500/50' : ''}`}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="flex-1">{project.title}</CardTitle>
                                    {project.featured && (
                                        <Star className="h-5 w-5 text-teal-500 fill-teal-500" />
                                    )}
                                </div>
                                <CardDescription>{project.description}</CardDescription>
                                <Badge variant="outline" className="w-fit mt-2">
                                    {project.category}
                                </Badge>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                                {project.impact && (
                                    <p className="text-xs text-muted-foreground mt-3 italic">
                                        Impact: {project.impact}
                                    </p>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between gap-2">
                                {project.github !== "#" ? (
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={project.github} target="_blank">
                                            <Github className="mr-2 h-4 w-4" />
                                            Code
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" size="sm" disabled>
                                        <Github className="mr-2 h-4 w-4" />
                                        Private
                                    </Button>
                                )}
                                {project.demo !== "#" ? (
                                    <Button size="sm" asChild>
                                        <Link href={project.demo} target="_blank">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Demo
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button size="sm" disabled>
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        N/A
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No projects found in this category
                </div>
            )}
        </section>
    )
}
