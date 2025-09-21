'use client'

import { useState } from 'react'

import { useQuery } from 'convex/react'
import { motion } from 'framer-motion'

import { api } from '~/convex/_generated/api'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface Guest {
  _id: string
  name: string
  email?: string
  attending?: boolean | null
}

interface GuestSearchProps {
  onGuestFound: (guest: Guest) => void
}

export default function GuestSearch({ onGuestFound }: GuestSearchProps) {
  const [searchName, setSearchName] = useState('')
  const [hasAttemptedSearch, setHasAttemptedSearch] = useState(false)

  // Get all guests and search client-side for simplicity
  const guests = useQuery(api.guests.getGuests)

  const foundGuest = guests?.find(
    (guest) => guest.name.toLowerCase() === searchName.trim().toLowerCase()
  )

  const notFound = hasAttemptedSearch && searchName.trim() && !foundGuest

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchName.trim()) return

    setHasAttemptedSearch(true)

    if (foundGuest) {
      onGuestFound(foundGuest)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="mb-2 font-serif text-2xl">Find Your Invitation</h2>
        <p className="text-muted-foreground">
          Please enter your name to locate your wedding invitation
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <Label htmlFor="searchName" className="mb-2 block">
            Your Name
          </Label>
          <Input
            id="searchName"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value)
              setHasAttemptedSearch(false)
            }}
            placeholder="Enter your full name"
            required
          />
        </div>

        {notFound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-center"
          >
            <p className="text-red-800">
              We couldn't find your name on our guest list. Please check the spelling or contact Nicole & James if you believe this is an error.
            </p>
          </motion.div>
        )}

        <Button type="submit" className="w-full">
          Find My Invitation
        </Button>
      </form>
    </motion.div>
  )
}