import { useMutation, useQueryClient } from "react-query"
import * as api from '../api'

const useFollow = () => {
  const queryClient = useQueryClient()

  const followMutation = useMutation(async ({ _id }) => {
    const { data } = await api.followUser({ _id })
    
    return _id
  }, {
    onSuccess(_id) {
      queryClient.setQueryData(['users'], (users) => {
        return users.map((user) => {
          if (user._id === _id) {
            return { ...user, currentUserFollows: true }
          }
          return user
        })
      })
      queryClient.setQueryData(['currentUser'], (user) => {
        return { ...user, numFollowings: user.numFollowings + 1 }
      })
    }
  })

  return {
    ...followMutation,
    errorType: followMutation.error?.response?.data.errorType
  }
}

export default useFollow
