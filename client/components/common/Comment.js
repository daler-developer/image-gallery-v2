import pt from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import styled, { css } from 'styled-components'
import Avatar from './Avatar'
import IconButton from './IconButton'
import Popup from './Popup'
import * as api from '../../utils/api'
import { selectIdOfPostViewingComments } from '../../redux/reducers/uiReducer'
import { postsActions } from '../../redux/reducers/postsReducer'
import * as yup from 'yup'
import Input from './Input'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const Comment = ({ comment, onCommentDeleted, onUpdatedComment }) => {
  const [isEditFormHidden, setIsEditFormHidden] = useState(true)
  const [isPopupHidden, setIsPopupHidden] = useState(true)

  const dispatch = useDispatch()

  const editFormRef = useRef(null)
  const textInputRef = useRef(null)

  const idOfPostViewingComments = useSelector((state) => selectIdOfPostViewingComments(state))

  useOnClickOutside(editFormRef, () => {
    if (!isEditFormHidden) {
      setIsEditFormHidden(true)
    }
  })

  const editForm = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: yup.object({
      text: yup.string().trim().required('required').min(1, 'min 1').max(20, 'max 20')
    }),
    async onSubmit(v) {
      try {
        const { comment: newComment } = await dispatch(postsActions.commentUpdated({ commentId: comment._id, text: v.text })).unwrap()

        if (onUpdatedComment) {
          onUpdatedComment(newComment._id, newComment)
        }
      } finally {
        editForm.resetForm()
        setIsEditFormHidden(true)
      }
    }
  })

  useEffect(() => {
    if (!isEditFormHidden) {
      editForm.setValues({ text: comment.text })
      textInputRef.current?.focus()
    }
  }, [isEditFormHidden])

  const handlers = {
    async deleteCommentBtnClick() {
      await dispatch(postsActions.commentDeleted({ postId: idOfPostViewingComments, commentId: comment._id })).unwrap()

      if (onCommentDeleted) {
        onCommentDeleted(comment._id)
      }
      setIsPopupHidden(true)
    },
    editCommentBtnClick() {
      setIsEditFormHidden(false)
      setIsPopupHidden(true)
    },
    openPopupBtnClick() {
      if (isPopupHidden) {
        setIsPopupHidden(false)
      }
    }
  }

  return (
    <StyledWrapper $withEditForm={!isEditFormHidden}>
      
      <StyledAvatar src={comment.creator.avatarUrl} />

      <StyledUsername>
        {comment.creator.username}
      </StyledUsername>

      {
        isEditFormHidden ? (
          <StyledText>
            {comment.text}
          </StyledText>
        ) : (
          <StyledEditForm ref={editFormRef} onSubmit={editForm.handleSubmit}>
            <StyledEditInput
              ref={textInputRef}
              size='sm'
              error={editForm.touched.text && editForm.errors.text}
              inputProps={{
                placeholder: 'Edit',
                ...editForm.getFieldProps('text')
              }}
            />
          </StyledEditForm>
        )
      }

      {
        comment.isCreatedByCurrentUser && (
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
        )
      }

    </StyledWrapper>
  )
}

Comment.propTypes = {
  comment: pt.object.isRequired,
  onCommentDeleted: pt.func,
  onUpdatedComment: pt.func
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

  ${({ $withEditForm }) => $withEditForm && css`
    grid-template-areas:
      'avatar username  options-btn'
      'avatar edit-form options-btn';
  `}
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

const StyledEditForm = styled.form`
  grid-area: edit-form;
  align-self: start;
  display: flex;
`

const StyledEditInput = styled(Input)`
  width: 100%;
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
