import pt from 'prop-types'
import styled from 'styled-components'
import IconButton from './IconButton'
import Post from './Post'
import Spinner from './Spinner'

const Posts = ({ list, isFetching, onLoadMoreBtnClick, ...rest }) => {
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
        ) : (
          <StyledLoadMoreBtn size='md' color='light' onClick={onLoadMoreBtnClick}>
            add
          </StyledLoadMoreBtn>
        )
      }

    </StyledWrapper>
  )
}

Posts.propTypes = {
  list: pt.array.isRequired,
  isFetching: pt.bool.isRequired,
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

const StyledLoadMoreBtn = styled(IconButton)`
  align-self: center;
`

const StyledSpinner = styled(Spinner)`
  align-self: center;
`

export default Posts
