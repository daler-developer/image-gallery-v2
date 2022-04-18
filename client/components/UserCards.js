import { useEffect } from 'react'
import styled from 'styled-components'
import useUsers from '../hooks/useUsers'
import Spinner from './common/Spinner'
import UserCard from './common/UserCard'

const UserCards = ({}) => {
  const users = useUsers({ page: 'users' })

  useEffect(() => {
    users.refetch()
  }, [])

  return (
    <StyledWrapper>
      
      {
        users.isFetching ? (

          <StyledSpinner />

        ) : users.isError ? (

          <h4>error</h4>

        ) : (

          <StyledList>
            {
              users.list.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                />
              ))
            }
          </StyledList>

        )
      }

    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`

`

const StyledSpinner = styled(Spinner)`
  margin: 0 auto;
`

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`

export default UserCards
