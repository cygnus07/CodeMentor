// codementor/client/app/(dashboard)/profile/page.tsx
"use client"

import { useAuth } from '@/lib/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Clock, MessageSquare, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">Active User</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
                {user.lastLogin && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Last login: {formatDate(user.lastLogin)} at {formatTime(user.lastLogin)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with CodeMentor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/chat">
                <Button variant="gradient" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start New Chat
                </Button>
              </Link>
              
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <div className="flex items-start space-x-3">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">AI-Powered Assistance</h4>
                    <p className="text-sm text-muted-foreground">
                      Get instant help with coding questions, debugging, and best practices.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your activity overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold gradient-text">0</div>
                  <p className="text-sm text-muted-foreground mt-1">Total Chats</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold gradient-text">0</div>
                  <p className="text-sm text-muted-foreground mt-1">Messages Sent</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold gradient-text">Active</div>
                  <p className="text-sm text-muted-foreground mt-1">Account Status</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}