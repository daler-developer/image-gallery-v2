import { useMutation, useQueryClient } from "react-query"
import * as api from '../api'

const useLogin = () => {
  const queryClient = useQueryClient()

  const loginMutation = useMutation(async ({ username, password }) => {
    const { data } = await api.login(username, password)
    
    return data
  }, {
    onSuccess(data) {
      localStorage.setItem('auth-token', data.token)
      
      queryClient.setQueryData(['currentUser'], data.user)
    }
  })

  return {
    ...loginMutation,
    errorType: loginMutation.error?.response.data.errorType
  }
}

export default useLogin
