import { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../components/common/Button'
import Layout from '../../components/common/Layout'
import Spinner from '../../components/common/Spinner'
import UserCard from '../../components/common/UserCard'
import useUsers from '../../hooks/useUsers'

const Users = ({}) => {
  const users = useUsers()

  useEffect(() => {
    users.refetch()
  }, [])

  const handlers = {
    loadMoreBtnClick() {
      users.loadMore()
    }
  }

  return (
    <StyledWrapper>
      
      {
        users.isSuccess && (
          <StyledUserCards>
            {
              users.list.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                />
              ))
            }
          </StyledUserCards>
        )
      }

      {
        users.isLoading ? (
          <Spinner />
        ) : users.isError ? (
          <h4>Error</h4>
        ) : <>
          <Button onClick={handlers.loadMoreBtnClick}>
            More
          </Button>
        </>
      }

    </StyledWrapper>
  )
}


Users.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

const StyledWrapper = styled.div`
  
`

const StyledUserCards = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`

export default Users
