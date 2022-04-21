import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Layout from '../../components/common/Layout'
import Spinner from '../../components/common/Spinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import UserCard from '../../components/common/UserCard'
import { selectUsers, selectUsersErrorType, selectUsersFetchingStatus, usersActions } from '../../redux/reducers/usersReducer'
import Button from '../../components/common/Button'

const Users = ({}) => {
  const users = useSelector((state) => selectUsers(state))
  const status = useSelector((state) => selectUsersFetchingStatus(state))
  const errorType = useSelector((state) => selectUsersErrorType(state))

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(usersActions.fetch())
    }
  }, [])

  const handlers = {
    loadMoreBtnClick() {
      dispatch(usersActions.fetch({ offset: users.length }))
    }
  }

  return (
    <StyledWrapper>

      <StyledUserCards>
        {
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
            />
          ))
        }
      </StyledUserCards>

      {
        status === 'fetching' ? (
          <Spinner />
        ) : status === 'error' ? (
          <ErrorMessage type={errorType} />
        ) : status === 'success' && (
          <Button onClick={handlers.loadMoreBtnClick}>
            Load more
          </Button>
        )
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
