'use client'

import { useState } from 'react'

import { useMutation, useQuery } from 'convex/react'

import { api } from '~/convex/_generated/api'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

import type { Id } from '~/convex/_generated/dataModel'
import { AnimatePresence, motion } from 'framer-motion'

interface Guest {
  _id: string
  name: string
  email?: string
  phone?: string
  attending?: boolean | null
  children?: Guest[]
}

interface GuestContactInfo {
  attending: boolean | null
  contact: string
}

export default function RsvpForm() {
  const [foundGuest, setFoundGuest] = useState<Guest | null>(null)
  const [guestDetails, setGuestDetails] = useState<
    Record<string, GuestContactInfo>
  >({})
  const [searchName, setSearchName] = useState('')
  const [hasAttemptedSearch, setHasAttemptedSearch] = useState(false)

  const guests = useQuery(api.guests.getGuests)
  const updatePartyRsvp = useMutation(api.guests.updatePartyRsvp)

  // Find guest by search
  const foundGuestFromSearch = guests?.find(
    (guest) => guest.name.toLowerCase() === searchName.trim().toLowerCase()
  )
  const notFound =
    hasAttemptedSearch && searchName.trim() && !foundGuestFromSearch

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchName.trim()) return

    setHasAttemptedSearch(true)

    if (foundGuestFromSearch) {
      // Initialize guest details state
      const allMembers = [
        foundGuestFromSearch,
        ...(foundGuestFromSearch.children || []),
      ]
      const initialDetails: Record<string, GuestContactInfo> = {}

      allMembers.forEach((member) => {
        initialDetails[member._id] = {
          attending: member.attending ?? null,
          contact: member.email || member.phone || '',
        }
      })

      setGuestDetails(initialDetails)
      setFoundGuest(foundGuestFromSearch)
    }
  }

  const handleSubmit = async () => {
    if (!foundGuest) return

    try {
      const allPartyMembers = [foundGuest, ...(foundGuest.children || [])]
      const partyUpdates = allPartyMembers.map((member) => {
        const contact = guestDetails[member._id]?.contact || ''
        const isEmail = contact.includes('@')

        return {
          guestId: member._id as Id<'guests'>,
          attending: guestDetails[member._id]?.attending ?? false,
          email: isEmail ? contact : undefined,
          phone: !isEmail && contact ? contact : undefined,
        }
      })

      await updatePartyRsvp({
        partyUpdates,
      })

      alert('RSVP submitted!')
      setFoundGuest(null)
      setGuestDetails({})
      setSearchName('')
      setHasAttemptedSearch(false)
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('Error submitting RSVP. Please try again.')
    }
  }

  const allPartyMembers = foundGuest
    ? [foundGuest, ...(foundGuest.children || [])]
    : []

  // Form validation - check that all guests have made attendance decision and attending guests have contact info
  const isFormValid = () => {
    return allPartyMembers.every((member) => {
      const details = guestDetails[member._id]
      if (!details) return false

      // Must have made attendance decision (cannot be null)
      if (details.attending === null) return false

      // If attending, must have contact info
      if (details.attending === true) {
        return details.contact.trim() !== ''
      }

      // If not attending, just need attendance decision (already checked above)
      return details.attending === false
    })
  }

  // Helper: Render attendance radio buttons
  function renderAttendanceRadios(member: Guest, isMobile: boolean) {
    const baseClasses = isMobile
      ? 'flex flex-1 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors'
      : 'flex flex-1 cursor-pointer items-center justify-center rounded border px-2 py-1 text-xs transition-colors'

    return (
      <div className={`flex ${isMobile ? 'gap-2' : 'gap-1'}`} role="radiogroup" aria-label={`Attendance ${isMobile ? 'choice' : ''} for ${member.name}`}>
        <Label className={`${baseClasses} ${guestDetails[member._id]?.attending === true ? 'border-green-600 bg-green-100 text-green-800' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}>
          <input
            type="radio"
            name={`attending-${member._id}`}
            checked={guestDetails[member._id]?.attending === true}
            onChange={() => setGuestDetails((prev) => ({ ...prev, [member._id]: { ...prev[member._id], attending: true } }))}
            className="sr-only"
          />
          Yes
        </Label>
        <Label className={`${baseClasses} ${guestDetails[member._id]?.attending === false ? 'border-red-600 bg-red-100 text-red-800' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}>
          <input
            type="radio"
            name={`attending-${member._id}`}
            checked={guestDetails[member._id]?.attending === false}
            onChange={() => setGuestDetails((prev) => ({ ...prev, [member._id]: { ...prev[member._id], attending: false } }))}
            className="sr-only"
          />
          No
        </Label>
      </div>
    )
  }

  // Helper: Render contact input with animation
  function renderContactInput(member: Guest, isMobile: boolean) {
    if (guestDetails[member._id]?.attending !== true) {
      return !isMobile ? <div className="text-muted-foreground text-sm">—</div> : null
    }

    return (
      <motion.div
        initial={{ opacity: 0, [isMobile ? 'height' : 'width']: 0 }}
        animate={{ opacity: 1, [isMobile ? 'height' : 'width']: 'auto' }}
        exit={{ opacity: 0, [isMobile ? 'height' : 'width']: 0 }}
        transition={{ duration: 0.15 }}
      >
        {isMobile && <Label className="mb-1 block font-medium text-gray-700 text-sm">Email or Phone Number *</Label>}
        <Input
          type="text"
          value={guestDetails[member._id]?.contact || ''}
          onChange={(e) => setGuestDetails((prev) => ({ ...prev, [member._id]: { ...prev[member._id], contact: e.target.value } }))}
          placeholder={isMobile ? '...' : 'Email or phone number'}
          required={guestDetails[member._id]?.attending === true}
          className={isMobile ? 'w-full' : 'h-9 w-full text-sm'}
        />
      </motion.div>
    )
  }

  // Show search form if no guest found
  if (!foundGuest) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-lg space-y-6"
      >
        <div className="text-center">
          <h2 className="mb-2 font-serif text-2xl">Find Your Invitation</h2>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <Input
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value)
              setHasAttemptedSearch(false)
            }}
            placeholder="Enter your full name"
            required
          />

          {notFound && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-center"
            >
              <p className="text-red-800 text-sm">
                Name not found. Please check spelling or contact Nicole & James.
              </p>
            </motion.div>
          )}

          <Button type="submit" className="w-full">
            Find Invitation
          </Button>
        </form>
      </motion.div>
    )
  }

  // Show RSVP form for found guest
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
      className="mx-auto max-w-4xl space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="mb-2 font-serif text-2xl">
            Hello, {foundGuest.name}!
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setFoundGuest(null)
              setGuestDetails({})
              setSearchName('')
              setHasAttemptedSearch(false)
            }}
          >
            ← Back
          </Button>
        </div>

        {/* Batch Actions for Large Parties */}
        {allPartyMembers.length > 3 && (
          <div className="rounded-lg border bg-blue-50/50 p-4">
            <h3 className="mb-3 font-medium text-blue-900">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const updatedDetails = { ...guestDetails }
                  allPartyMembers.forEach((member) => {
                    updatedDetails[member._id] = {
                      ...updatedDetails[member._id],
                      attending: true,
                    }
                  })
                  setGuestDetails(updatedDetails)
                }}
                className="border-green-200 text-green-700 hover:bg-green-100"
              >
                All Attending
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const updatedDetails = { ...guestDetails }
                  allPartyMembers.forEach((member) => {
                    updatedDetails[member._id] = {
                      ...updatedDetails[member._id],
                      attending: false,
                    }
                  })
                  setGuestDetails(updatedDetails)
                }}
                className="border-red-200 text-red-700 hover:bg-red-100"
              >
                None Attending
              </Button>
            </div>
          </div>
        )}

        {/* Guest List - Row-Based Layout */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Please provide attendance and contact information for each guest
            </p>
          </div>

          {/* Guest Rows */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <AnimatePresence>
              {allPartyMembers.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`rounded-lg border bg-white/50 p-3 shadow-sm transition-colors hover:bg-white/70 ${index % 2 === 0 ? 'bg-white/40' : 'bg-white/60'}`}
                >
                  {/* Mobile Layout */}
                  <div className="space-y-3 lg:hidden">
                    <div className="border-gray-200 border-b pb-2">
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                    </div>
                    <div>
                      <Label className="mb-2 block font-medium text-gray-700 text-sm">Attending *</Label>
                      {renderAttendanceRadios(member, true)}
                    </div>
                    <AnimatePresence>
                      {guestDetails[member._id]?.attending === true && renderContactInput(member, true)}
                    </AnimatePresence>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden grid-cols-12 items-center gap-12 lg:grid">
                    <div className="col-span-3">
                      <h4 className="truncate font-medium text-gray-900">{member.name}</h4>
                    </div>
                    <div className="col-span-2">
                      {renderAttendanceRadios(member, false)}
                    </div>
                    <div className="col-span-7">
                      <AnimatePresence>
                        {renderContactInput(member, false)}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={!isFormValid()}>
          Submit RSVP for {allPartyMembers.length}{' '}
          {allPartyMembers.length === 1 ? 'Guest' : 'Guests'}
        </Button>
      </motion.div>
    </form>
  )
}
