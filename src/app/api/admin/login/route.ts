import { NextRequest, NextResponse } from 'next/server'
import { checkPassword, issueToken, ADMIN_COOKIE } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null)
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!checkPassword(password)) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set(ADMIN_COOKIE, issueToken(), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    return res
}
