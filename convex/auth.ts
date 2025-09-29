import { v } from 'convex/values'

import { action } from './_generated/server'

const CORRECT_PASSWORD = 'james&nicole'

export const checkPassword = action({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    // Simple password check on the server side
    return args.password === CORRECT_PASSWORD
  },
})
