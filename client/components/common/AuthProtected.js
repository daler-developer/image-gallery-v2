import pt from 'prop-types'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useCurrentUser from '../../hooks/useCurrentUser'

const AuthProtected = ({ children }) => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  useEffect(() => {
    if (!currentUser.isAuthenticated) {
      router.push('/auth?tab=login')
    }
  }, [currentUser.isAuthenticated])

  if (!currentUser.isAuthenticated) {
    return null
  }

  return children
}

AuthProtected.propTypes = {
  children: pt.any.isRequired
}

export default AuthProtected
