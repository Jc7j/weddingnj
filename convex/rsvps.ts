import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

export const createRsvp = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    attending: v.boolean(),
    numberOfGuests: v.number(),
    dietaryRestrictions: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingRsvp = await ctx.db
      .query('rsvps')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()

    if (existingRsvp) {
      await ctx.db.patch(existingRsvp._id, {
        ...args,
        createdAt: Date.now(),
      })
      return existingRsvp._id
    }

    const rsvpId = await ctx.db.insert('rsvps', {
      ...args,
      createdAt: Date.now(),
    })

    return rsvpId
  },
})

export const getRsvps = query({
  handler: async (ctx) => {
    return await ctx.db.query('rsvps').order('desc').collect()
  },
})

export const getRsvpByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('rsvps')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()
  },
})
