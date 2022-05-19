import pt from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Avatar from './Avatar'
import IconButton from './IconButton'
import Popup from './Popup'
import * as api from '../../utils/api'
import { selectIdOfPostViewingComments } from '../../redux/reducers/uiReducer'
import { postsActions } from '../../redux/reducers/postsReducer'

const Comment = ({ comment, onCommentDeleted }) => {
  const [isPopupHidden, setIsPopupHidden] = useState(true)

  const dispatch = useDispatch()

  const idOfPostViewingComments = useSelector((state) => selectIdOfPostViewingComments(state))

  const handlers = {
    async deleteCommentBtnClick() {
      await dispatch(postsActions.commentDeleted({ postId: idOfPostViewingComments, commentId: comment._id })).unwrap()

      if (onCommentDeleted) {
        onCommentDeleted(comment._id)
      }
    },
    editCommentBtnClick() {

    },
    openPopupBtnClick() {
      if (isPopupHidden) {
        setIsPopupHidden(false)
      }
    }
  }

  return (
    <StyledWrapper>
      
      <StyledAvatar src={comment.creator.avatarUrl} />

      <StyledUsername>
        {comment.creator.username}
      </StyledUsername>

      <StyledText>
        {comment.text}
      </StyledText>

      <StyledPopupWrapper>
        <StyledOptionsBtn size='md' color='light' onClick={handlers.openPopupBtnClick}>
          more_vert
        </StyledOptionsBtn>
        <StyledPopup
          isHidden={isPopupHidden}
          onClose={() => setIsPopupHidden(true)}
          btns={[
            { text: 'Delete', onClick: handlers.deleteCommentBtnClick },
            { text: 'Edit', onClick: handlers.editCommentBtnClick }
          ]}
        />
      </StyledPopupWrapper>

    </StyledWrapper>
  )
}

Comment.propTypes = {
  comment: pt.object.isRequired,
  onCommentDeleted: pt.func
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
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledPopupWrapper = styled.div`
  grid-area: options-btn;
  align-self: center;
  position: relative;
`

const StyledOptionsBtn = styled(IconButton)`

`

const StyledPopup = styled(Popup)`
  position: absolute;
  top: 100%;
  right: 0;
`

export default Comment
