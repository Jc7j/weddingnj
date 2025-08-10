'use client'

import { useEffect, useState } from 'react'

import { useQuery } from 'convex/react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { api } from '~/convex/_generated/api'

import { AnimatePresence, motion } from 'framer-motion'

const ADMIN_PASSWORD = 'nicolejames2026'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const rsvps = useQuery(api.rsvps.getRsvps)

  useEffect(() => {
    const authenticated = sessionStorage.getItem('adminAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuthenticated', 'true')
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuthenticated')
    setPassword('')
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const attendingCount = rsvps?.filter((r) => r.attending).length ?? 0
  const notAttendingCount = rsvps?.filter((r) => !r.attending).length ?? 0
  const totalGuests =
    rsvps
      ?.filter((r) => r.attending)
      .reduce((sum, r) => sum + r.numberOfGuests, 0) ?? 0

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="rounded-lg bg-white/80 p-8 shadow-xl backdrop-blur-sm">
            <h1 className="mb-6 text-center font-serif text-2xl">
              Admin Access
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="/"
              className="font-serif text-xl tracking-wider transition-colors hover:opacity-80 sm:text-2xl"
              style={{ color: '#2B4735' }}
            >
              NJ
            </a>
            <h1 className="font-serif text-xl sm:text-3xl">RSVP Admin</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Logout
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
        >
          <div className="rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="mb-1 text-muted-foreground text-xs sm:mb-2 sm:text-sm">
              Total RSVPs
            </p>
            <p className="font-bold text-2xl sm:text-3xl">
              {rsvps?.length ?? 0}
            </p>
          </div>
          <div className="rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="mb-1 text-muted-foreground text-xs sm:mb-2 sm:text-sm">
              Attending
            </p>
            <p className="font-bold text-2xl text-green-600 sm:text-3xl">
              {attendingCount}
            </p>
          </div>
          <div className="rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="mb-1 text-muted-foreground text-xs sm:mb-2 sm:text-sm">
              Not Attending
            </p>
            <p className="font-bold text-2xl text-red-600 sm:text-3xl">
              {notAttendingCount}
            </p>
          </div>
          <div className="rounded-lg bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <p className="mb-1 text-muted-foreground text-xs sm:mb-2 sm:text-sm">
              Total Guests
            </p>
            <p className="font-bold text-2xl text-blue-600 sm:text-3xl">
              {totalGuests}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg bg-white/80 shadow-xl backdrop-blur-sm"
        >
          {/* Desktop Table View */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="border-b bg-primary/10">
                <tr>
                  <th className="p-4 text-left font-semibold">Name</th>
                  <th className="p-4 text-left font-semibold">Email</th>
                  <th className="p-4 text-left font-semibold">Attending</th>
                  <th className="p-4 text-left font-semibold">Guests</th>
                  <th className="p-4 text-left font-semibold">Dietary</th>
                  <th className="p-4 text-left font-semibold">Message</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {rsvps?.map((rsvp, index) => (
                    <motion.tr
                      key={rsvp._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-accent/5"
                    >
                      <td className="p-4 font-medium">{rsvp.name}</td>
                      <td className="p-4 text-sm">{rsvp.email}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
                            rsvp.attending
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {rsvp.attending ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="p-4 text-center">{rsvp.numberOfGuests}</td>
                      <td className="p-4 text-sm">
                        {rsvp.dietaryRestrictions || '-'}
                      </td>
                      <td
                        className="max-w-xs truncate p-4 text-sm"
                        title={rsvp.message || ''}
                      >
                        {rsvp.message || '-'}
                      </td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {formatDate(rsvp.createdAt)}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <AnimatePresence>
              {rsvps?.map((rsvp, index) => (
                <motion.div
                  key={rsvp._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b p-4 last:border-b-0"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-base">{rsvp.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {rsvp.email}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
                        rsvp.attending
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {rsvp.attending ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Guests:</span>{' '}
                      {rsvp.numberOfGuests}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>{' '}
                      {formatDate(rsvp.createdAt).split(',')[0]}
                    </div>
                  </div>
                  {rsvp.dietaryRestrictions && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Dietary:</span>{' '}
                      {rsvp.dietaryRestrictions}
                    </div>
                  )}
                  {rsvp.message && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Message:</span>
                      <p className="mt-1 text-muted-foreground">
                        {rsvp.message}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {(!rsvps || rsvps.length === 0) && (
              <div className="py-8 text-center text-muted-foreground sm:py-12">
                No RSVPs yet
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
