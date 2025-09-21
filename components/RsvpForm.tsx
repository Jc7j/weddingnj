'use client'

import { useState } from 'react'

import { useForm } from '@tanstack/react-form'
import { useMutation } from 'convex/react'

import { api } from '~/convex/_generated/api'

import GuestSearch from './GuestSearch'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

import type { Id } from '~/convex/_generated/dataModel'
import { motion } from 'framer-motion'

interface Guest {
  _id: string
  name: string
  email?: string
  attending?: boolean | null
}

export default function RsvpForm() {
  const [foundGuest, setFoundGuest] = useState<Guest | null>(null)
  const updateGuestRsvp = useMutation(api.guests.updateGuestRsvp)

  const form = useForm({
    defaultValues: {
      attending: true,
      email: '',
    },
    onSubmit: async ({ value }) => {
      if (!foundGuest) return

      try {
        await updateGuestRsvp({
          guestId: foundGuest._id as Id<'guests'>,
          attending: value.attending,
          email: value.email || undefined,
        })
        alert('RSVP submitted successfully!')
        // Reset to search state
        setFoundGuest(null)
        form.reset()
      } catch (error) {
        console.error('Error submitting RSVP:', error)
        alert('Error submitting RSVP. Please try again.')
      }
    },
  })

  // If no guest found yet, show search
  if (!foundGuest) {
    return <GuestSearch onGuestFound={setFoundGuest} />
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="mx-auto max-w-lg space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Welcome message for found guest */}
        <div className="text-center">
          <h2 className="mb-2 font-serif text-2xl">
            Hello, {foundGuest.name}!
          </h2>
          <p className="text-muted-foreground">
            We found your invitation. Please confirm your attendance below.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setFoundGuest(null)}
            className="mt-2"
          >
            ← Back to Search
          </Button>
        </div>

        <form.Field name="email">
          {(field) => (
            <div>
              <Label htmlFor={field.name} className="mb-2 block">
                Email Address (Optional)
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={foundGuest.email || 'your@example.com'}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="attending">
          {(field) => (
            <div className="space-y-2">
              <Label className="block">Will you be attending?</Label>
              <div className="flex gap-4">
                <Label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="true"
                    checked={field.state.value === true}
                    onChange={() => field.handleChange(true)}
                    className="mr-2"
                  />
                  Yes, I'll be there!
                </Label>
                <Label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="false"
                    checked={field.state.value === false}
                    onChange={() => field.handleChange(false)}
                    className="mr-2"
                  />
                  Sorry, can't make it
                </Label>
              </div>
            </div>
          )}
        </form.Field>

        {/* Show status if already responded */}
        {foundGuest.attending !== null && (
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 text-center">
            <p className="text-blue-800">
              You have already responded:{' '}
              <strong>
                {foundGuest.attending ? 'Attending' : 'Not Attending'}
              </strong>
            </p>
            <p className="mt-1 text-blue-600 text-sm">
              You can update your response below if needed.
            </p>
          </div>
        )}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </Button>
          )}
        </form.Subscribe>
      </motion.div>
    </form>
  )
}
