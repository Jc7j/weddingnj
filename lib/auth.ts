/**
 * Check if user is authenticated by verifying localStorage token
 */
export function checkAuthentication(): boolean {
  try {
    const authData = localStorage.getItem('wedding_auth')

    if (!authData) {
      return false
    }

    const { authenticated, expires } = JSON.parse(authData)

    // Check if token has expired
    if (Date.now() > expires) {
      localStorage.removeItem('wedding_auth')
      return false
    }

    return authenticated === true
  } catch {
    // If there's any error parsing, clear the invalid data
    localStorage.removeItem('wedding_auth')
    return false
  }
}
