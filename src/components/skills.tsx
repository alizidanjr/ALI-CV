"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { resumeData } from "@/data/resume-data"

const skillCategories = {
    "Languages": resumeData.skills.technical.languages,
    "Frontend": resumeData.skills.technical.frontend,
    "Backend": resumeData.skills.technical.backend,
    "Database": resumeData.skills.technical.database,
    "Creative Tools": resumeData.skills.technical.creative,
    "AI & Automation": resumeData.skills.technical.ai,
    "Tools": resumeData.skills.technical.tools,
    "Methodologies": resumeData.skills.methodologies,
    "Leadership": resumeData.skills.leadership,
}

export function Skills() {
    return (
        <section id="skills" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skillCategories).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col space-y-3"
                    >
                        <h3 className="text-lg font-semibold border-b pb-2">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs py-1 px-2">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
