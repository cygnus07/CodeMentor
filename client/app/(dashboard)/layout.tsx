"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/hooks/use-auth'
import { Navbar } from '@/components/layout/navbar'
import { Loader2 } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Remove padding for chat page
  const isChat = pathname === '/chat'

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <main className={isChat ? "" : "container mx-auto px-4 py-8"}>
        {children}
      </main>
    </div>
  )
}