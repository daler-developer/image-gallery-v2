import pt from 'prop-types'
import styled from 'styled-components'
import Avatar from './Avatar'
import IconButton from './IconButton'

const Comment = ({ comment }) => {
  return (
    <StyledWrapper>
      
      <StyledAvatar src={comment.creator.avatarUrl} />

      <StyledUsername>
        {'Daler'}
      </StyledUsername>

      <StyledText>
        {comment.text}
      </StyledText>

      <StyledOptionsBtn size='md' color='light'>
        more_vert
      </StyledOptionsBtn>

    </StyledWrapper>
  )
}

Comment.propTypes = {
  comment: pt.object.isRequired
}

const StyledWrapper = styled.li`
  display: grid;
  grid-template-areas:
    'avatar username options-btn'
    'avatar text     options-btn';
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: 1fr 1fr;
  row-gap: 4px;
  column-gap: 10px;
`

const StyledAvatar = styled(Avatar)`
  grid-area: avatar;
  width: 50px;
`

const StyledUsername = styled.span`
  grid-area: username;
  align-self: end;
  font-weight: 600;
`
const StyledText = styled.span`
  grid-area: text;
  align-self: start;
`

const StyledOptionsBtn = styled(IconButton)`
  grid-area: options-btn;
  align-self: center;
`

export default Comment
