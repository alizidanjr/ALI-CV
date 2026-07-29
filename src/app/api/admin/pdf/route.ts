import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'
import { isValidToken, ADMIN_COOKIE } from '@/lib/admin-auth'

const MAX_SIZE = 10 * 1024 * 1024

export async function POST(req: NextRequest) {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value
    if (!isValidToken(token)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData().catch(() => null)
    const file = formData?.get('file')
    if (!(file instanceof File) || file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 413 })
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
            { error: 'Blob storage not configured (missing BLOB_READ_WRITE_TOKEN)' },
            { status: 503 }
        )
    }

    const blob = await put('resume.pdf', file, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/pdf',
    })

    return NextResponse.json({ ok: true, url: blob.url })
}
