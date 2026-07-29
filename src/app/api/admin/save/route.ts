import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'
import { isValidToken, ADMIN_COOKIE } from '@/lib/admin-auth'
import type { Resume } from '@/lib/resume'

const MAX_SIZE = 256 * 1024

function isValidResume(body: unknown): body is Resume {
    if (!body || typeof body !== 'object') return false
    const r = body as Record<string, unknown>
    const objectKeys = ['personal', 'about', 'skills', 'education'] as const
    const arrayKeys = ['experience', 'projects', 'certifications'] as const
    return objectKeys.every((k) => r[k] !== null && typeof r[k] === 'object' && !Array.isArray(r[k]))
        && arrayKeys.every((k) => Array.isArray(r[k]))
}

export async function POST(req: NextRequest) {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value
    if (!isValidToken(token)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const raw = await req.text()
    if (raw.length > MAX_SIZE) {
        return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    }

    let body: unknown
    try {
        body = JSON.parse(raw)
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!isValidResume(body)) {
        return NextResponse.json({ error: 'Malformed resume data' }, { status: 400 })
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
            { error: 'Blob storage not configured (missing BLOB_READ_WRITE_TOKEN)' },
            { status: 503 }
        )
    }

    await put('resume.json', raw, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
    })

    return NextResponse.json({ ok: true })
}
