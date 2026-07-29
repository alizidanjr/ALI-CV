import { cookies } from 'next/headers'
import { isValidToken, ADMIN_COOKIE } from '@/lib/admin-auth'
import { getResume } from '@/lib/resume'
import { LoginForm } from './login-form'
import { AdminEditor } from './editor'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value

    if (!isValidToken(token)) {
        return <LoginForm />
    }

    const { resume, pdfUrl } = await getResume()
    return <AdminEditor initialResume={resume} initialPdfUrl={pdfUrl} />
}
