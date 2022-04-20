import { useQuery } from 'react-query'
import * as api from '../api'

const useUser = ({ _id }) => {
  const userQuery = useQuery(['user', { _id }], async () => {
    const { data } = await api.getUser({ _id })
    console.log('useUser')

    return data.user
  })

  return {
    ...userQuery,
    user: userQuery.data
  }
}

export default useUser
