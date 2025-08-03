'use client'

import { useForm, useStore } from '@tanstack/react-form'
import { useMutation } from 'convex/react'

import { api } from '~/convex/_generated/api'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

import { AnimatePresence, motion } from 'framer-motion'

export default function RsvpForm() {
  const createRsvp = useMutation(api.rsvps.createRsvp)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      attending: true,
      numberOfGuests: 1,
      dietaryRestrictions: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await createRsvp(value)
        alert('RSVP submitted successfully!')
        form.reset()
      } catch (error) {
        console.error('Error submitting RSVP:', error)
        alert('Error submitting RSVP. Please try again.')
      }
    },
  })

  const formValues = useStore(form.store, (state) => state.values)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="mx-auto max-w-lg space-y-6"
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.length < 2) {
                  return 'Name must be at least 2 characters'
                }
                return undefined
              },
            }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name} className="mb-2 block">
                  Full Name
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Acme Acme"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-red-500 text-sm">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!value || !emailRegex.test(value)) {
                  return 'Please enter a valid email'
                }
                return undefined
              },
            }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name} className="mb-2 block">
                  Email Address
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="acme@example.com"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-red-500 text-sm">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
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

          {formValues.attending && (
            <>
              <form.Field
                name="numberOfGuests"
                validators={{
                  onChange: ({ value }) => {
                    if (value < 1 || value > 5) {
                      return 'Number of guests must be between 1 and 5'
                    }
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name} className="mb-2 block">
                      Number of Guests
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      max="2"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-500 text-sm">
                        {field.state.meta.errors.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="dietaryRestrictions">
                {(field) => (
                  <div>
                    <Label htmlFor={field.name} className="mb-2 block">
                      Dietary Restrictions (Optional)
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Vegetarian, vegan, gluten-free, etc."
                    />
                  </div>
                )}
              </form.Field>
            </>
          )}

          <form.Field name="message">
            {(field) => (
              <div>
                <Label htmlFor={field.name} className="mb-2 block">
                  Message for the Couple (Optional)
                </Label>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Share your wishes..."
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>
            )}
          </form.Field>

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
      </AnimatePresence>
    </form>
  )
}
