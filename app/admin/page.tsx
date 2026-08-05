import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminRedirectPage() {
  const session = await getServerSession(authOptions)
  redirect(session ? '/dashboard' : '/login')
}
