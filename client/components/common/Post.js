import pt from 'prop-types'
import styled from 'styled-components'
import Image from 'next/image'

const Post = ({ post }) => {
  return (
    <StyledWrapper>

      <StyledImageWrapper>
        <Image src={post.imageUrl} layout='fill' />
      </StyledImageWrapper>

    </StyledWrapper>
  )
}

Post.propTypes = {
  post: pt.object.isRequired
}

const StyledWrapper = styled.li`
  aspect-ratio: 1 / 1;
  border: 1px solid black;
`

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export default Post
