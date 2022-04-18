import { useMutation, useQueryClient } from "react-query"
import * as api from '../api'

const useRegister = () => {
  const queryClient = useQueryClient()

  const registerMutation = useMutation(async ({ username, password }) => {
    const { data } = await api.register(username, password)
    
    return data
  }, {
    onSuccess(data) {
      localStorage.setItem('auth-token', data.token)
      
      queryClient.setQueryData(['currentUser'], data.user)
    }
  })

  return {
    ...registerMutation,
    errorType: registerMutation.error?.response.data.errorType
  }
}

export default useRegister
