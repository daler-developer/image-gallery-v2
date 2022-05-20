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
import UserCards from '../../components/common/UserCards'

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
    },
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

      <StyledUserCards
        list={filteredUsers}
        isFetching={status === 'fetching'}
        onLoadMoreBtnClick={handlers.loadMoreBtnClick}
      />

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
`

const StyledSearchInput = styled(SearchInput)`
  margin-top: 20px;
`

const StyledUserCards = styled(UserCards)`
  margin-top: 20px;
`

export default Users
