import { list } from '@vercel/blob'
import seed from '@/data/resume.json'

export type Resume = typeof seed

const FALLBACK_PDF_URL = '/resume.pdf'

// ponytail: no separate config for the blob store id — `list({ prefix })` finds
// resume.json/resume.pdf by pathname, and any failure (no token, empty store,
// bad JSON) just falls back to the committed seed. The site never breaks
// because Blob is unreachable.
export async function getResume(): Promise<{ resume: Resume; pdfUrl: string }> {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return { resume: seed, pdfUrl: FALLBACK_PDF_URL }
    }

    try {
        const { blobs } = await list({ prefix: 'resume' })
        const jsonBlob = blobs.find((b) => b.pathname === 'resume.json')
        const pdfBlob = blobs.find((b) => b.pathname === 'resume.pdf')

        let resume: Resume = seed
        if (jsonBlob) {
            const res = await fetch(jsonBlob.url, { cache: 'no-store' })
            if (res.ok) resume = await res.json()
        }

        return { resume, pdfUrl: pdfBlob?.url ?? FALLBACK_PDF_URL }
    } catch {
        return { resume: seed, pdfUrl: FALLBACK_PDF_URL }
    }
}
