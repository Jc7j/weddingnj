import { action } from './_generated/server'
import { v } from 'convex/values'

const CORRECT_PASSWORD = 'james&nicole'

export const checkPassword = action({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    // Simple password check on the server side
    return args.password === CORRECT_PASSWORD
  },
})