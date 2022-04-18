import { useQuery } from 'react-query'
import * as api from '../api'

const useUsers = ({}) => {
  const usersQuery = useQuery(['users'], async () => {
    const { data } = await api.getUsers({ limit: 10 })

    return data.users
  })

  return {
    ...usersQuery,
    list: usersQuery.data
  }
}

export default useUsers
