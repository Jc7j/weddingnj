import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  guests: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    attending: v.optional(v.boolean()),
  }).index('by_name', ['name']),
})
