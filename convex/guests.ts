import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

export const createGuest = mutation({
  args: {
    name: v.string(),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if guest already exists
    const existingGuest = await ctx.db
      .query('guests')
      .withIndex('by_name', (q) => q.eq('name', args.name))
      .first()

    if (existingGuest) {
      throw new Error('Guest with this name already exists')
    }

    const guestId = await ctx.db.insert('guests', {
      name: args.name,
      email: args.email,
      attending: undefined, // undefined means hasn't responded yet
    })

    return guestId
  },
})

export const findGuestByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    // Case-insensitive search
    const guests = await ctx.db.query('guests').collect()
    return guests.find(
      (guest) => guest.name.toLowerCase() === args.name.toLowerCase()
    )
  },
})

export const updateGuestRsvp = mutation({
  args: {
    guestId: v.id('guests'),
    attending: v.boolean(),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.guestId, {
      attending: args.attending,
      email: args.email,
    })
    return args.guestId
  },
})

export const getGuests = query({
  handler: async (ctx) => {
    return await ctx.db.query('guests').withIndex('by_name').collect()
  },
})

export const deleteGuest = mutation({
  args: { guestId: v.id('guests') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.guestId)
  },
})
