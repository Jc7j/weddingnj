import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

export const createGuest = mutation({
  args: {
    name: v.string(),
    email: v.optional(v.string()),
    parentId: v.optional(v.id('guests')),
  },
  handler: async (ctx, args) => {
    // Check if guest already exists (only check parent-level guests for name conflicts)
    const existingGuest = await ctx.db
      .query('guests')
      .withIndex('by_name', (q) => q.eq('name', args.name))
      .filter((q) => q.eq(q.field('parentId'), undefined))
      .first()

    if (existingGuest && !args.parentId) {
      throw new Error('Guest with this name already exists')
    }

    const guestId = await ctx.db.insert('guests', {
      name: args.name,
      email: args.email,
      attending: undefined, // undefined means hasn't responded yet
      parentId: args.parentId,
    })

    return guestId
  },
})

export const findGuestByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    // Normalize function for flexible matching
    const normalize = (name: string) => {
      return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/[''`]/g, "'") // Normalize apostrophes
        .replace(/[-–—]/g, '-') // Normalize dashes
        .replace(/[.,]/g, '') // Remove periods and commas
    }

    const normalizedInput = normalize(args.name)
    const guests = await ctx.db.query('guests').collect()

    return guests.find((guest) => normalize(guest.name) === normalizedInput)
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
    // Get only parent-level guests (where parentId is undefined)
    const parentGuests = await ctx.db
      .query('guests')
      .withIndex('by_parent', (q) => q.eq('parentId', undefined))
      .collect()

    // For each parent, get their children
    const guestsWithChildren = await Promise.all(
      parentGuests.map(async (parent) => {
        const children = await ctx.db
          .query('guests')
          .withIndex('by_parent', (q) => q.eq('parentId', parent._id))
          .collect()

        return {
          ...parent,
          children,
        }
      })
    )

    return guestsWithChildren
  },
})

export const addGuestToParty = mutation({
  args: {
    parentId: v.id('guests'),
    name: v.string(),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify parent exists
    const parent = await ctx.db.get(args.parentId)
    if (!parent) {
      throw new Error('Parent guest not found')
    }

    // Ensure parent is not a child guest themselves
    if (parent.parentId) {
      throw new Error('Cannot add guests to a child guest')
    }

    const guestId = await ctx.db.insert('guests', {
      name: args.name,
      email: args.email,
      attending: undefined,
      parentId: args.parentId,
    })

    return guestId
  },
})

export const getGuestWithChildren = query({
  args: { guestId: v.id('guests') },
  handler: async (ctx, args) => {
    const guest = await ctx.db.get(args.guestId)
    if (!guest) return null

    const children = await ctx.db
      .query('guests')
      .withIndex('by_parent', (q) => q.eq('parentId', args.guestId))
      .collect()

    return {
      ...guest,
      children,
    }
  },
})

export const updatePartyRsvp = mutation({
  args: {
    partyUpdates: v.array(
      v.object({
        guestId: v.id('guests'),
        attending: v.boolean(),
        email: v.optional(v.string()),
        phone: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Update each party member's attendance and contact info
    for (const update of args.partyUpdates) {
      const guest = await ctx.db.get(update.guestId)
      if (!guest) continue

      const updateData: {
        attending: boolean
        email?: string
        phone?: string
      } = { attending: update.attending }

      // Update contact info if provided
      if (update.email) {
        updateData.email = update.email
      }
      if (update.phone) {
        updateData.phone = update.phone
      }

      await ctx.db.patch(update.guestId, updateData)
    }

    return { success: true }
  },
})

export const deleteGuest = mutation({
  args: { guestId: v.id('guests') },
  handler: async (ctx, args) => {
    const guest = await ctx.db.get(args.guestId)
    if (!guest) return

    // If deleting a parent, also delete all children
    if (!guest.parentId) {
      const children = await ctx.db
        .query('guests')
        .withIndex('by_parent', (q) => q.eq('parentId', args.guestId))
        .collect()

      for (const child of children) {
        await ctx.db.delete(child._id)
      }
    }

    await ctx.db.delete(args.guestId)
  },
})
