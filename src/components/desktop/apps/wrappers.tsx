"use client"

import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { useDesktop } from "@/components/desktop/desktop-context"
import { Badge } from "@/components/ui/badge"

export function ProjectsApp() {
    return (
        <div className="h-full bg-background p-4 overflow-auto">
            <Projects />
        </div>
    )
}

export function AboutApp() {
    const { resume } = useDesktop()
    return (
        <div className="h-full bg-background p-6 overflow-auto">
            <div className="prose dark:prose-invert max-w-none space-y-8">
                {/* Header */}
                <section>
                    <h1 className="text-3xl font-bold mb-2">{resume.personal.name}</h1>
                    <p className="text-xl text-muted-foreground">
                        {resume.personal.title} | {resume.personal.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{resume.personal.tagline}</p>

                    <div className="flex gap-4 mt-4 flex-wrap">
                        <a
                            href={resume.personal.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            GitHub
                        </a>
                        <a
                            href={resume.personal.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            LinkedIn
                        </a>
                        <span className="text-sm text-muted-foreground">{resume.personal.email}</span>
                    </div>
                </section>

                {/* Summary */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">About</h2>
                    <p className="text-lg leading-relaxed">{resume.about.summary}</p>
                </section>

                {/* Creative Philosophy */}
                <section className="bg-muted/30 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-2 text-teal-700 dark:text-teal-400">Creative Philosophy</h3>
                    <p className="text-base leading-relaxed italic">{resume.about.philosophy}</p>
                </section>

                {/* Experience */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Experience</h2>
                    <div className="space-y-6">
                        {resume.experience.map((exp, index) => (
                            <div key={index} className="relative pl-4 border-l-2 border-muted">
                                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg">{exp.role}</h3>
                                        <p className="text-muted-foreground">{exp.company} | {exp.location}</p>
                                    </div>
                                    <Badge variant={exp.current ? "default" : "outline"}>
                                        {exp.period}
                                    </Badge>
                                </div>
                                <p className="text-sm mb-2">{exp.description}</p>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {exp.tech.map((tech, i) => (
                                        <Badge key={i} variant="secondary" className="text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Education</h2>
                    <div>
                        <h3 className="font-bold text-lg">{resume.education.degree}</h3>
                        <p className="text-muted-foreground">{resume.education.institution}</p>
                        <p className="text-sm">
                            Dual Degree with {resume.education.dualDegree.institution} |
                            {resume.education.period} | GPA: {resume.education.gpa}
                        </p>
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Skills</h2>
                    <Skills />
                </section>

                {/* Languages */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Languages</h2>
                    <div className="flex gap-4">
                        <div>
                            <span className="font-semibold">Arabic:</span> {resume.skills.languages.arabic}
                        </div>
                        <div>
                            <span className="font-semibold">English:</span> {resume.skills.languages.english}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export function ContactApp() {
    return (
        <div className="h-full bg-background p-4 overflow-auto flex items-center justify-center">
            <Contact />
        </div>
    )
}
