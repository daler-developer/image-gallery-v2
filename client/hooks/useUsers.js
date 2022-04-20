import { useState } from 'react'
import { useQuery } from 'react-query'
import * as api from '../api'

const useUsers = ({}) => {
  const [offset, setOffset] = useState(0)

  const usersQuery = useQuery(['users'], async () => {
    const { data } = await api.getUsers({ limit: 10, offset })

    return data.users
  })

  const loadMore = () => {
    setOffset(offset + 2)

    usersQuery.refetch()
  }

  return {
    ...usersQuery,
    list: usersQuery.data,
    loadMore
  }
}

export default useUsers
