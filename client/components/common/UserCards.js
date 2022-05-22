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
        isFetching ? (
          <StyledSpinner size='md' />
        ) : <>
          {
            errorType && <ErrorMessage type={errorType} />
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

const StyledSpinner = styled(Spinner)`
  margin: 20px auto 0;
`

const StyledLoadMoreBtn = styled(IconButton)`
  margin: 20px auto 0;
`

export default UserCards
