import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rsvps: defineTable({
    name: v.string(),
    email: v.string(),
    attending: v.boolean(),
    numberOfGuests: v.number(),
    dietaryRestrictions: v.optional(v.string()),
    message: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
