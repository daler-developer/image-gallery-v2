import { useMutation, useQueryClient } from "react-query"
import * as api from '../api'
import useCurrentUser from './useCurrentUser'

const useUpdateProfile = () => {
  const currentUser = useCurrentUser()

  const updateProfileMutation = useMutation(async (body) => {
    const { data } = await api.updateProfile({ _id: currentUser.user._id, body })
    
    return data.user
  })

  return {
    ...updateProfileMutation
  }
}

export default useUpdateProfile
