import crypto from 'crypto'

// ponytail: hardcoded PIN gate for a single-owner CV editor, not a
// multi-user auth system. Cookie is a keyed hash of the password so it's
// unguessable without knowing the PIN, timing-safe compared, httpOnly.
const ADMIN_PASSWORD = '191203'
const COOKIE_SALT = 'alios-admin-v1'

export const ADMIN_COOKIE = 'alios_admin'

function expectedToken(): string {
    return crypto.createHash('sha256').update(ADMIN_PASSWORD + COOKIE_SALT).digest('hex')
}

function timingSafeStringEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a)
    const bufB = Buffer.from(b)
    if (bufA.length !== bufB.length) return false
    return crypto.timingSafeEqual(bufA, bufB)
}

export function checkPassword(password: string): boolean {
    return timingSafeStringEqual(password, ADMIN_PASSWORD)
}

export function issueToken(): string {
    return expectedToken()
}

export function isValidToken(token: string | undefined): boolean {
    if (!token) return false
    return timingSafeStringEqual(token, expectedToken())
}
