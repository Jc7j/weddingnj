import { httpRouter } from 'convex/server'

import { httpAction } from './_generated/server'

const http = httpRouter()

const CORRECT_PASSWORD = 'james&nicoleforever'
const AUTH_COOKIE_NAME = 'wedding_auth'
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 days in seconds

// Handle password authentication
http.route({
  path: '/auth',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const body = await request.json()
    const { password } = body

    if (password === CORRECT_PASSWORD) {
      const response = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Set HTTP-only cookie with 7-day expiration
      const cookieValue = `${AUTH_COOKIE_NAME}=authenticated; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`

      response.headers.set('Set-Cookie', cookieValue)
      return response
    } else {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }),
})

// Check authentication status
http.route({
  path: '/auth',
  method: 'GET',
  handler: httpAction(async (ctx, request) => {
    const cookies = request.headers.get('cookie') || ''
    const authCookie = cookies
      .split(';')
      .find((cookie) => cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`))

    const authenticated = authCookie?.includes('authenticated') || false

    return new Response(JSON.stringify({ authenticated }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }),
})

export default http
