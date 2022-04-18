import { useMemo } from "react"
import { useQuery, useQueryClient } from "react-query"
import * as api from '../api'

const useCurrentUser = () => {
  const queryClient = useQueryClient()

  const currentUser = useQuery(['currentUser'], async () => {
    const { data } = await api.getCurrentUser()

    return data.user
  })

  const isAuthenticated = useMemo(() => {
    if (currentUser.data) {
      return true
    }

    return false
  }, [currentUser.data])

  const logout = () => {
    queryClient.setQueryData(['currentUser'], null)

    localStorage.removeItem('auth-token')
  }

  const user = currentUser.data

  return {
    ...currentUser,
    isAuthenticated,
    logout,
    user
  }
}

export default useCurrentUser
