import pt from 'prop-types'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'

const AuthProtected = ({ children }) => {
  const isAuthenticated = useIsAuthenticated()

  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/auth?tab=login`)
      // router.push(`/auth?tab=login&next=${encodeURIComponent(router.asPath)}`)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  return children
}

AuthProtected.propTypes = {
  children: pt.any.isRequired
}

export default AuthProtected
