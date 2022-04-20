import { useMutation, useQueryClient } from "react-query"
import * as api from '../api'

const useUnfollow = () => {
  const queryClient = useQueryClient()

  const unfollowMutation = useMutation(async ({ _id }) => {
    await api.unfollowUser({ _id })
    
    return _id
  }, {
    onSuccess(_id) {
      queryClient.setQueryData(['users'], (users) => {
        return users.map((user) => {
          if (user._id === _id) {
            return { ...user, currentUserFollows: false }
          }
          return user
        })
      })
      queryClient.setQueryData(['currentUser'], (user) => {
        return { ...user, numFollowings: user.numFollowings - 1 }
      })
    }
  })

  return {
    ...unfollowMutation,
    errorType: unfollowMutation.error?.response?.data.errorType
  }
}

export default useUnfollow
