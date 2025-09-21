import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  guests: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    attending: v.optional(v.boolean()),
    parentId: v.optional(v.id('guests')),
  })
    .index('by_name', ['name'])
    .index('by_parent', ['parentId']),
})
