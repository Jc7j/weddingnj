'use client'

import { useState } from 'react'

import { useMutation, useQuery } from 'convex/react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { api } from '~/convex/_generated/api'
import type { Id } from '~/convex/_generated/dataModel'

import { AnimatePresence, motion } from 'framer-motion'

const ADMIN_PASSWORD = 'admin'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [guestForm, setGuestForm] = useState({ name: '', email: '' })

  const guests = useQuery(api.guests.getGuests)
  const createGuest = useMutation(api.guests.createGuest)
  const deleteGuest = useMutation(api.guests.deleteGuest)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestForm.name.trim()) return

    try {
      await createGuest({
        name: guestForm.name.trim(),
        email: guestForm.email.trim() || undefined,
      })
      setGuestForm({ name: '', email: '' })
    } catch (error) {
      alert(`Error creating guest: ${(error as Error).message}`)
    }
  }

  const handleDeleteGuest = async (guestId: string) => {
    if (confirm('Are you sure you want to remove this guest?')) {
      try {
        await deleteGuest({ guestId: guestId as Id<'guests'> })
      } catch {
        alert('Error removing guest')
      }
    }
  }

  const totalGuests = guests?.length ?? 0
  const attendingCount = guests?.filter((g) => g.attending === true).length ?? 0
  const notAttendingCount =
    guests?.filter((g) => g.attending === false).length ?? 0
  const notRespondedCount =
    guests?.filter((g) => g.attending === null).length ?? 0

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
            <h1 className="font-serif text-xl sm:text-3xl">Guest Admin</h1>
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
              Total Guests
            </p>
            <p className="font-bold text-2xl sm:text-3xl">{totalGuests}</p>
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
              Not Responded
            </p>
            <p className="font-bold text-2xl text-orange-600 sm:text-3xl">
              {notRespondedCount}
            </p>
          </div>
        </motion.div>

        {/* Guest Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 rounded-lg bg-white/80 p-6 shadow-xl backdrop-blur-sm"
        >
          <h2 className="mb-4 font-serif text-xl">Add New Guest</h2>
          <form
            onSubmit={handleCreateGuest}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <div className="flex-1">
              <Label htmlFor="guestName">Guest Name</Label>
              <Input
                id="guestName"
                value={guestForm.name}
                onChange={(e) =>
                  setGuestForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter guest name"
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="guestEmail">Email (Optional)</Label>
              <Input
                id="guestEmail"
                type="email"
                value={guestForm.email}
                onChange={(e) =>
                  setGuestForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="guest@example.com"
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full sm:w-auto">
                Add Guest
              </Button>
            </div>
          </form>
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
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {guests?.map((guest, index) => (
                    <motion.tr
                      key={guest._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-accent/5"
                    >
                      <td className="p-4 font-medium">{guest.name}</td>
                      <td className="p-4 text-sm">{guest.email || '-'}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
                            guest.attending === true
                              ? 'bg-green-100 text-green-800'
                              : guest.attending === false
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {guest.attending === true
                            ? 'Attending'
                            : guest.attending === false
                              ? 'Not Attending'
                              : 'Not Responded'}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button
                          onClick={() => handleDeleteGuest(guest._id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </Button>
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
              {guests?.map((guest, index) => (
                <motion.div
                  key={guest._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b p-4 last:border-b-0"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-base">{guest.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {guest.email || 'No email'}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
                        guest.attending === true
                          ? 'bg-green-100 text-green-800'
                          : guest.attending === false
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {guest.attending === true
                        ? 'Attending'
                        : guest.attending === false
                          ? 'Not Attending'
                          : 'Not Responded'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Button
                      onClick={() => handleDeleteGuest(guest._id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      Remove Guest
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {(!guests || guests.length === 0) && (
              <div className="py-8 text-center text-muted-foreground sm:py-12">
                No guests added yet
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
