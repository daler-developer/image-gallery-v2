import pt from 'prop-types'
import styled from 'styled-components'
import Post from './Post'

const Posts = ({ list, ...rest }) => {
  return (
    <StyledWrapper {...rest}>
      {
        list.map((post) => (
          <Post key={post._id} post={post} />
        ))
      }
    </StyledWrapper>
  )
}

Posts.propTypes = {
  list: pt.array.isRequired
}

const StyledWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`

export default Posts
