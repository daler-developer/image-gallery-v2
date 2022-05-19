import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Layout from '../../components/common/Layout'
import Spinner from '../../components/common/Spinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import UserCard from '../../components/common/UserCard'
import { selectUsers, selectUsersErrorType, selectUsersFetchingStatus, usersActions } from '../../redux/reducers/usersReducer'
import Button from '../../components/common/Button'
import IconButton from '../../components/common/IconButton'
import SearchInput from '../../components/common/SearchInput'

const Users = ({}) => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const users = useSelector((state) => selectUsers(state))
  const status = useSelector((state) => selectUsersFetchingStatus(state))
  const errorType = useSelector((state) => selectUsersErrorType(state))

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.username.includes(searchInputValue))
  }, [users, searchInputValue])

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(usersActions.fetchedUsers())
    }
  }, [])

  const handlers = {
    loadMoreBtnClick() {
      dispatch(usersActions.fetchedUsers({ offset: users.length }))
    }
  }

  return (
    <StyledWrapper>

      <StyledSearchInput
        inputProps={{
          placeholder: 'Search',
          value: searchInputValue,
          onChange: (e) => setSearchInputValue(e.target.value)
        }}
      />

      <StyledUserCards>
        {
          filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
            />
          ))
        }
      </StyledUserCards>

      {
        status === 'fetching' ? (
          <StyledSpinner size='md' />
        ) : status === 'error' ? (
          <ErrorMessage type={errorType} />
        ) : status === 'success' && (
          <StyledLoadMoreBtn size='md' onClick={handlers.loadMoreBtnClick}>
            add
          </StyledLoadMoreBtn>
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
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

const StyledSearchInput = styled(SearchInput)`
  margin-top: 20px;
`

const StyledUserCards = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`

const StyledSpinner = styled(Spinner)`
  align-self: center;
`

const StyledLoadMoreBtn = styled(IconButton)`
  align-self: center;
`

export default Users
