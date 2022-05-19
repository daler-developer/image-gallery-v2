import pt from 'prop-types'
import styled from 'styled-components'
import IconButton from './IconButton'
import Post from './Post'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'

const Posts = ({ list, isFetching, errorType = null, onLoadMoreBtnClick, ...rest }) => {
  console.log(list)
  
  return (
    <StyledWrapper {...rest}>

      {
        !isFetching && list.length === 0 ? (
          <StyledNoPostInfo>
            No posts
          </StyledNoPostInfo>
        ) : (
          <StyledList>
            {
              list.map((post) => (
                <Post key={post._id} post={post} />
              ))
            }
          </StyledList>
        )
      }
      
      {
        isFetching ? (
          <StyledSpinner size='md' color='black' />
        ) : <>
          {errorType && <StyledErrorMessage type={errorType} />}
          <StyledLoadMoreBtn size='md' color='light' onClick={onLoadMoreBtnClick}>
            add
          </StyledLoadMoreBtn>
        </>
      }

    </StyledWrapper>
  )
}

Posts.propTypes = {
  list: pt.array.isRequired,
  isFetching: pt.bool.isRequired,
  errorType: pt.bool,
  onLoadMoreBtnClick: pt.func.isRequired
}

const StyledWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`

const StyledNoPostInfo = styled.div`
  font-weight: 600;
  align-self: center;
`

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`

const StyledErrorMessage = styled(ErrorMessage)`
  text-align: center;
`

const StyledLoadMoreBtn = styled(IconButton)`
  align-self: center;
`

const StyledSpinner = styled(Spinner)`
  align-self: center;
`

export default Posts
