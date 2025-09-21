'use client'

import React, { useState } from 'react'

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
  const [expandedParentId, setExpandedParentId] = useState<string | null>(null)
  const [childForm, setChildForm] = useState({ name: '', email: '' })

  const guests = useQuery(api.guests.getGuests)
  const createGuest = useMutation(api.guests.createGuest)
  const deleteGuest = useMutation(api.guests.deleteGuest)
  const addGuestToParty = useMutation(api.guests.addGuestToParty)

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

  const handleAddToParty = (parentId: string) => {
    setExpandedParentId(expandedParentId === parentId ? null : parentId)
    setChildForm({ name: '', email: '' })
  }

  const handleAddChild = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault()
    if (!childForm.name.trim()) return

    try {
      await addGuestToParty({
        parentId: parentId as Id<'guests'>,
        name: childForm.name.trim(),
        email: childForm.email.trim() || undefined,
      })
      setChildForm({ name: '', email: '' })
      setExpandedParentId(null)
    } catch (error) {
      alert(`Error adding guest to party: ${(error as Error).message}`)
    }
  }

  // Calculate statistics including children
  const allGuests =
    guests?.flatMap((parent) => [parent, ...parent.children]) ?? []
  const totalGuests = allGuests.length
  const totalParties = guests?.length ?? 0
  const attendingCount = allGuests.filter((g) => g.attending === true).length
  const notAttendingCount = allGuests.filter(
    (g) => g.attending === false
  ).length
  const notRespondedCount = allGuests.filter(
    (g) => g.attending === undefined
  ).length

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

        {/* Statistics Bar */}
        <div className="mb-8 rounded-lg bg-white/80 p-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <span>
              <strong>Guests:</strong> {totalGuests}
            </span>
            <span className="text-muted-foreground">|</span>
            <span>
              <strong>Parties:</strong> {totalParties}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-green-700">
              <strong>Attending:</strong> {attendingCount}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-red-700">
              <strong>Not Attending:</strong> {notAttendingCount}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-orange-700">
              <strong>Pending:</strong> {notRespondedCount}
            </span>
          </div>
        </div>

        {/* Guest Management Section */}
        <div className="mb-8 rounded-lg bg-white/80 p-6">
          <h2 className="mb-4 font-serif text-xl">Add New Guest</h2>
          <form
            onSubmit={handleCreateGuest}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <div className="flex-1">
              <Label htmlFor="guestName" className="mb-2 block">Guest Name</Label>
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
              <Label htmlFor="guestEmail" className="mb-2 block">Email (Optional)</Label>
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
        </div>

        <div className="rounded-lg bg-white/80">
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
                  {guests?.map((parent, index) => (
                    <React.Fragment key={parent._id}>
                      {/* Parent Row */}
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b transition-colors hover:bg-accent/5"
                      >
                        <td className="p-4 font-medium">{parent.name}</td>
                        <td className="p-4 text-sm">{parent.email || '-'}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
                              parent.attending === true
                                ? 'bg-green-100 text-green-800'
                                : parent.attending === false
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {parent.attending === true
                              ? 'Attending'
                              : parent.attending === false
                                ? 'Not Attending'
                                : 'Not Responded'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAddToParty(parent._id)}
                              variant="outline"
                              size="sm"
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              Add to Party
                            </Button>
                            <Button
                              onClick={() => handleDeleteGuest(parent._id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </td>
                      </motion.tr>

                      {/* Child Rows */}
                      {parent.children?.map((child, childIndex) => (
                        <motion.tr
                          key={child._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.05 + (childIndex + 1) * 0.02,
                          }}
                          className="border-b bg-muted/20 transition-colors hover:bg-accent/5"
                        >
                          <td className="p-4 pl-8 font-medium text-muted-foreground text-sm">
                            ↳ {child.name}
                          </td>
                          <td className="p-4 text-muted-foreground text-sm">
                            {child.email || '-'}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
                                child.attending === true
                                  ? 'bg-green-100 text-green-800'
                                  : child.attending === false
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              {child.attending === true
                                ? 'Attending'
                                : child.attending === false
                                  ? 'Not Attending'
                                  : 'Not Responded'}
                            </span>
                          </td>
                          <td className="p-4">
                            <Button
                              onClick={() => handleDeleteGuest(child._id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </td>
                        </motion.tr>
                      ))}

                      {/* Inline Add Form */}
                      {expandedParentId === parent._id && (
                        <motion.tr
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="border-b bg-blue-50/50"
                        >
                          <td colSpan={4} className="p-4">
                            <form
                              onSubmit={(e) => handleAddChild(e, parent._id)}
                              className="flex gap-2"
                            >
                              <Input
                                placeholder="Guest name"
                                value={childForm.name}
                                onChange={(e) =>
                                  setChildForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                                className="flex-1"
                                required
                              />
                              <Input
                                placeholder="Email (optional)"
                                type="email"
                                value={childForm.email}
                                onChange={(e) =>
                                  setChildForm((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }))
                                }
                                className="flex-1"
                              />
                              <Button type="submit" size="sm">
                                Add
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setExpandedParentId(null)}
                              >
                                Cancel
                              </Button>
                            </form>
                          </td>
                        </motion.tr>
                      )}
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <AnimatePresence>
              {guests?.map((parent) => (
                <div key={parent._id}>
                  {/* Parent Card */}
                  <div className="border-b p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-base">
                          {parent.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {parent.email || 'No email'}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
                          parent.attending === true
                            ? 'bg-green-100 text-green-800'
                            : parent.attending === false
                              ? 'bg-red-100 text-red-800'
                              : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {parent.attending === true
                          ? 'Attending'
                          : parent.attending === false
                            ? 'Not Attending'
                            : 'Not Responded'}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button
                        onClick={() => handleAddToParty(parent._id)}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        Add to Party
                      </Button>
                      <Button
                        onClick={() => handleDeleteGuest(parent._id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Child Cards */}
                  {parent.children?.map((child) => (
                    <div
                      key={child._id}
                      className="ml-4 border-b bg-muted/20 p-3"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-muted-foreground text-sm">
                            ↳ {child.name}
                          </h4>
                          <p className="text-muted-foreground text-xs">
                            {child.email || 'No email'}
                          </p>
                        </div>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${
                            child.attending === true
                              ? 'bg-green-100 text-green-800'
                              : child.attending === false
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {child.attending === true
                            ? 'Attending'
                            : child.attending === false
                              ? 'Not Attending'
                              : 'Not Responded'}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Button
                          onClick={() => handleDeleteGuest(child._id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Inline Add Form for Mobile */}
                  {expandedParentId === parent._id && (
                    <div className="border-b bg-blue-50/50 p-4">
                      <form
                        onSubmit={(e) => handleAddChild(e, parent._id)}
                        className="space-y-2"
                      >
                        <Input
                          placeholder="Guest name"
                          value={childForm.name}
                          onChange={(e) =>
                            setChildForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                        />
                        <Input
                          placeholder="Email (optional)"
                          type="email"
                          value={childForm.email}
                          onChange={(e) =>
                            setChildForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" className="flex-1">
                            Add Guest
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setExpandedParentId(null)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </AnimatePresence>
            {(!guests || guests.length === 0) && (
              <div className="py-8 text-center text-muted-foreground sm:py-12">
                No guests added yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
