"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Resume } from '@/lib/resume'

type Experience = Resume['experience'][number]
type Project = Resume['projects'][number]

const toLines = (arr: string[]) => arr.join('\n')
const fromLines = (text: string) => text.split('\n').map((s) => s.trim()).filter(Boolean)

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof Input>) {
    return (
        <label className="block space-y-1">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <Input {...props} />
        </label>
    )
}

function TextField({ label, ...props }: { label: string } & React.ComponentProps<typeof Textarea>) {
    return (
        <label className="block space-y-1">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <Textarea {...props} />
        </label>
    )
}

const emptyExperience: Experience = {
    role: '', company: '', location: '', period: '', current: false,
    description: '', achievements: [], tech: [], type: 'fulltime',
}

const emptyProject: Project = {
    title: '', category: '', description: '', tech: [], images: [],
    github: '#', demo: '#', featured: false, impact: '',
}

export function AdminEditor({ initialResume, initialPdfUrl }: { initialResume: Resume; initialPdfUrl: string }) {
    const [resume, setResume] = useState<Resume>(initialResume)
    const [pdfUrl, setPdfUrl] = useState(initialPdfUrl)
    const [saving, setSaving] = useState(false)
    const [saveMsg, setSaveMsg] = useState('')
    const [uploadingPdf, setUploadingPdf] = useState(false)
    const [pdfMsg, setPdfMsg] = useState('')

    const save = async () => {
        setSaving(true)
        setSaveMsg('')
        const res = await fetch('/api/admin/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resume),
        })
        const body = await res.json().catch(() => ({}))
        setSaveMsg(res.ok ? 'Saved.' : `Error: ${body.error ?? res.statusText}`)
        setSaving(false)
    }

    const uploadPdf = async (file: File) => {
        setUploadingPdf(true)
        setPdfMsg('')
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/admin/pdf', { method: 'POST', body: formData })
        const body = await res.json().catch(() => ({}))
        if (res.ok) {
            setPdfUrl(body.url)
            setPdfMsg('PDF updated.')
        } else {
            setPdfMsg(`Error: ${body.error ?? res.statusText}`)
        }
        setUploadingPdf(false)
    }

    const logout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' })
        window.location.reload()
    }

    // --- update helpers -------------------------------------------------
    const setPersonal = <K extends keyof Resume['personal']>(key: K, value: Resume['personal'][K]) =>
        setResume((r) => ({ ...r, personal: { ...r.personal, [key]: value } }))

    const setLink = (key: keyof Resume['personal']['links'], value: string) =>
        setResume((r) => ({ ...r, personal: { ...r.personal, links: { ...r.personal.links, [key]: value } } }))

    const setAbout = <K extends keyof Resume['about']>(key: K, value: Resume['about'][K]) =>
        setResume((r) => ({ ...r, about: { ...r.about, [key]: value } }))

    const setEducation = <K extends keyof Resume['education']>(key: K, value: Resume['education'][K]) =>
        setResume((r) => ({ ...r, education: { ...r.education, [key]: value } }))

    const setDualDegree = (key: keyof Resume['education']['dualDegree'], value: string) =>
        setResume((r) => ({
            ...r,
            education: { ...r.education, dualDegree: { ...r.education.dualDegree, [key]: value } },
        }))

    const setSkillGroup = (group: keyof Resume['skills']['technical'], text: string) =>
        setResume((r) => ({
            ...r,
            skills: { ...r.skills, technical: { ...r.skills.technical, [group]: fromLines(text) } },
        }))

    const setLanguageLevel = (key: keyof Resume['skills']['languages'], value: string) =>
        setResume((r) => ({ ...r, skills: { ...r.skills, languages: { ...r.skills.languages, [key]: value } } }))

    const setExperience = <K extends keyof Experience>(index: number, key: K, value: Experience[K]) =>
        setResume((r) => ({
            ...r,
            experience: r.experience.map((exp, i) => (i === index ? { ...exp, [key]: value } : exp)),
        }))

    const setProject = <K extends keyof Project>(index: number, key: K, value: Project[K]) =>
        setResume((r) => ({
            ...r,
            projects: r.projects.map((p, i) => (i === index ? { ...p, [key]: value } : p)),
        }))

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">CV Admin</h1>
                    <div className="flex items-center gap-3">
                        {saveMsg && <span className="text-sm text-muted-foreground">{saveMsg}</span>}
                        <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                        <Button variant="outline" onClick={logout}>Log out</Button>
                    </div>
                </div>

                {/* Personal */}
                <Card>
                    <CardHeader><CardTitle>Personal</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Name" value={resume.personal.name} onChange={(e) => setPersonal('name', e.target.value)} />
                        <Field label="Title" value={resume.personal.title} onChange={(e) => setPersonal('title', e.target.value)} />
                        <Field label="Subtitle" value={resume.personal.subtitle} onChange={(e) => setPersonal('subtitle', e.target.value)} />
                        <Field label="Tagline" value={resume.personal.tagline} onChange={(e) => setPersonal('tagline', e.target.value)} />
                        <Field label="Location" value={resume.personal.location} onChange={(e) => setPersonal('location', e.target.value)} />
                        <Field label="Email" value={resume.personal.email} onChange={(e) => setPersonal('email', e.target.value)} />
                        <Field label="Phone" value={resume.personal.phone} onChange={(e) => setPersonal('phone', e.target.value)} />
                        <Field label="LinkedIn URL" value={resume.personal.links.linkedin} onChange={(e) => setLink('linkedin', e.target.value)} />
                        <Field label="GitHub URL" value={resume.personal.links.github} onChange={(e) => setLink('github', e.target.value)} />
                        <Field label="Portfolio URL" value={resume.personal.links.portfolio} onChange={(e) => setLink('portfolio', e.target.value)} />
                    </CardContent>
                </Card>

                {/* About */}
                <Card>
                    <CardHeader><CardTitle>About</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <TextField label="Summary" value={resume.about.summary} onChange={(e) => setAbout('summary', e.target.value)} className="min-h-24" />
                        <TextField label="Vision" value={resume.about.vision} onChange={(e) => setAbout('vision', e.target.value)} className="min-h-20" />
                        <TextField label="Philosophy" value={resume.about.philosophy} onChange={(e) => setAbout('philosophy', e.target.value)} className="min-h-20" />
                    </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                    <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {resume.experience.map((exp, i) => (
                            <div key={i} className="space-y-3 border rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Role" value={exp.role} onChange={(e) => setExperience(i, 'role', e.target.value)} />
                                    <Field label="Company" value={exp.company} onChange={(e) => setExperience(i, 'company', e.target.value)} />
                                    <Field label="Location" value={exp.location} onChange={(e) => setExperience(i, 'location', e.target.value)} />
                                    <Field label="Period" value={exp.period} onChange={(e) => setExperience(i, 'period', e.target.value)} />
                                </div>
                                <TextField label="Description" value={exp.description} onChange={(e) => setExperience(i, 'description', e.target.value)} />
                                <TextField label="Achievements (one per line)" value={toLines(exp.achievements)} onChange={(e) => setExperience(i, 'achievements', fromLines(e.target.value))} className="min-h-24" />
                                <TextField label="Tech (one per line)" value={toLines(exp.tech)} onChange={(e) => setExperience(i, 'tech', fromLines(e.target.value))} />
                                <div className="flex items-center gap-4 flex-wrap">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={exp.current} onChange={(e) => setExperience(i, 'current', e.target.checked)} />
                                        Current role
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        Type
                                        <select
                                            className="bg-transparent border rounded px-2 py-1"
                                            value={exp.type}
                                            onChange={(e) => setExperience(i, 'type', e.target.value)}
                                        >
                                            <option value="fulltime">fulltime</option>
                                            <option value="freelance">freelance</option>
                                            <option value="internship">internship</option>
                                        </select>
                                    </label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="ml-auto text-red-500 hover:text-red-500"
                                        onClick={() => setResume((r) => ({ ...r, experience: r.experience.filter((_, idx) => idx !== i) }))}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" onClick={() => setResume((r) => ({ ...r, experience: [...r.experience, { ...emptyExperience }] }))}>
                            + Add experience
                        </Button>
                    </CardContent>
                </Card>

                {/* Projects */}
                <Card>
                    <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {resume.projects.map((project, i) => (
                            <div key={i} className="space-y-3 border rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Title" value={project.title} onChange={(e) => setProject(i, 'title', e.target.value)} />
                                    <Field label="Category" value={project.category} onChange={(e) => setProject(i, 'category', e.target.value)} />
                                    <Field label="GitHub URL (# if private)" value={project.github} onChange={(e) => setProject(i, 'github', e.target.value)} />
                                    <Field label="Demo URL (# if none)" value={project.demo} onChange={(e) => setProject(i, 'demo', e.target.value)} />
                                </div>
                                <TextField label="Description" value={project.description} onChange={(e) => setProject(i, 'description', e.target.value)} />
                                <TextField label="Tech (one per line)" value={toLines(project.tech)} onChange={(e) => setProject(i, 'tech', fromLines(e.target.value))} />
                                <TextField label="Impact" value={project.impact} onChange={(e) => setProject(i, 'impact', e.target.value)} />
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={project.featured} onChange={(e) => setProject(i, 'featured', e.target.checked)} />
                                        Featured
                                    </label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="ml-auto text-red-500 hover:text-red-500"
                                        onClick={() => setResume((r) => ({ ...r, projects: r.projects.filter((_, idx) => idx !== i) }))}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" onClick={() => setResume((r) => ({ ...r, projects: [...r.projects, { ...emptyProject }] }))}>
                            + Add project
                        </Button>
                    </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                    <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField label="Languages" value={toLines(resume.skills.technical.languages)} onChange={(e) => setSkillGroup('languages', e.target.value)} />
                        <TextField label="Frontend" value={toLines(resume.skills.technical.frontend)} onChange={(e) => setSkillGroup('frontend', e.target.value)} />
                        <TextField label="Backend" value={toLines(resume.skills.technical.backend)} onChange={(e) => setSkillGroup('backend', e.target.value)} />
                        <TextField label="Database" value={toLines(resume.skills.technical.database)} onChange={(e) => setSkillGroup('database', e.target.value)} />
                        <TextField label="Tools" value={toLines(resume.skills.technical.tools)} onChange={(e) => setSkillGroup('tools', e.target.value)} />
                        <TextField label="Creative" value={toLines(resume.skills.technical.creative)} onChange={(e) => setSkillGroup('creative', e.target.value)} />
                        <TextField label="AI" value={toLines(resume.skills.technical.ai)} onChange={(e) => setSkillGroup('ai', e.target.value)} />
                        <TextField label="Methodologies" value={toLines(resume.skills.methodologies)} onChange={(e) => setResume((r) => ({ ...r, skills: { ...r.skills, methodologies: fromLines(e.target.value) } }))} />
                        <TextField label="Leadership" value={toLines(resume.skills.leadership)} onChange={(e) => setResume((r) => ({ ...r, skills: { ...r.skills, leadership: fromLines(e.target.value) } }))} />
                        <Field label="Arabic level" value={resume.skills.languages.arabic} onChange={(e) => setLanguageLevel('arabic', e.target.value)} />
                        <Field label="English level" value={resume.skills.languages.english} onChange={(e) => setLanguageLevel('english', e.target.value)} />
                    </CardContent>
                </Card>

                {/* Education */}
                <Card>
                    <CardHeader><CardTitle>Education</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Degree" value={resume.education.degree} onChange={(e) => setEducation('degree', e.target.value)} />
                        <Field label="Institution" value={resume.education.institution} onChange={(e) => setEducation('institution', e.target.value)} />
                        <Field label="Location" value={resume.education.location} onChange={(e) => setEducation('location', e.target.value)} />
                        <Field label="Period" value={resume.education.period} onChange={(e) => setEducation('period', e.target.value)} />
                        <Field label="GPA" value={resume.education.gpa} onChange={(e) => setEducation('gpa', e.target.value)} />
                        <Field label="Dual degree institution" value={resume.education.dualDegree.institution} onChange={(e) => setDualDegree('institution', e.target.value)} />
                        <Field label="Dual degree location" value={resume.education.dualDegree.location} onChange={(e) => setDualDegree('location', e.target.value)} />
                    </CardContent>
                </Card>

                <Separator />

                {/* PDF */}
                <Card>
                    <CardHeader><CardTitle>Resume PDF</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                            Current file: <a href={pdfUrl} target="_blank" rel="noreferrer" className="underline">{pdfUrl}</a>
                        </p>
                        <Input
                            type="file"
                            accept="application/pdf"
                            disabled={uploadingPdf}
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) uploadPdf(file)
                            }}
                        />
                        {uploadingPdf && <p className="text-sm text-muted-foreground">Uploading...</p>}
                        {pdfMsg && <p className="text-sm text-muted-foreground">{pdfMsg}</p>}
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3 pb-8">
                    {saveMsg && <span className="text-sm text-muted-foreground self-center">{saveMsg}</span>}
                    <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                </div>
            </div>
        </div>
    )
}
