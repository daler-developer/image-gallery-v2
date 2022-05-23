import pt from 'prop-types'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'
import IconButton from './IconButton'
import Spinner from './Spinner'
import UserCard from './UserCard'

const UserCards = ({ list, isFetching, errorType = null, onLoadMoreBtnClick, ...rest }) => {
  return (
    <StyledWrapper {...rest}>

      <StyledList>
        {
          list.map((user) => (
            <UserCard key={user._id} user={user} />
          ))
        }
      </StyledList>

      {
        !isFetching && list.length === 0 && (
          <StyledNoUsersInfo>
            No users
          </StyledNoUsersInfo>
        )
      }

      {
        isFetching ? (
          <StyledSpinner size='md' />
        ) : <>
          {
            errorType && <StyledErrorMessage align='center' type={'POSTS/POST_NOT_FOUND'} />
          }
          <StyledLoadMoreBtn size='md' onClick={onLoadMoreBtnClick}>add</StyledLoadMoreBtn>
        </>
      }

    </StyledWrapper>
  )
}

UserCards.propTypes = {
  list: pt.arrayOf(pt.object).isRequired,
  isFetching: pt.bool.isRequired,
  errorType: pt.string,
  onLoadMoreBtnClick: pt.func.isRequired
}

const StyledWrapper = styled.div`
  
`

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

const StyledNoUsersInfo = styled.div`
  text-align: center;
`

const StyledSpinner = styled(Spinner)`
  margin: 20px auto 0;
`

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 20px auto 0;
  display: block;
`

const StyledLoadMoreBtn = styled(IconButton)`
  margin: 20px auto 0;
`

export default UserCards
