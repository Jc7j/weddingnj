/**
 * Check if user is authenticated by verifying cookie via Convex HTTP endpoint
 */
export async function checkAuthentication(): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/auth`, {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    })

    if (response.ok) {
      const data = await response.json()
      return data.authenticated === true
    }

    return false
  } catch {
    return false
  }
}
