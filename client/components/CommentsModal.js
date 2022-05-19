import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectActiveModal, selectIdOfPostViewingComments, uiActions } from '../redux/reducers/uiReducer'
import Modal from './common/Modal'
import Comment from './common/Comment'
import * as api from '../utils/api'
import Spinner from './common/Spinner'
import CreateCommentForm from './common/CreateCommentForm'
import IconButton from './common/IconButton'
import ErrorMessage from './common/ErrorMessage'

const CommentsModal = ({}) => {
  const [comments, setComments] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [errorType, setErrorType] = useState(null)
  
  const isHidden = useSelector((state) => selectActiveModal(state)) !== 'comments'
  const idOfPostViewingComments = useSelector((state) => selectIdOfPostViewingComments(state))
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (isHidden) {
      dispatch(uiActions.changedIdOfPostViewingComments(null))
      setComments([])
      setErrorType(null)
      setIsFetching(false)
    } else {
      loadComments()
    }
  }, [isHidden])

  const loadComments = async () => {
    try {
      setIsFetching(true)
      setErrorType(null)
  
      const { data } = await api.getComments({ postId: idOfPostViewingComments, offset: comments.length })
  
      setComments([...comments, ...data.comments])
    } catch (e) {
      setErrorType(e.response.data.errorType)
    } finally {
      setIsFetching(false)
    }
  }
  
  const handlers = {
    newCommentCreated(comment) {
      setComments([...comments, comment])
    },
    commentDeleted(commentId) {
      setComments(comments.filter((comment) => comment._id !== commentId))
    },
    loadMoreBtnClick() {
      loadComments()
    }
  }

  return (
    <Modal title='Comments' isHidden={isHidden}>
      <StyledWrapper>

        <StyledList>
          {
            comments.length ? comments.map((comment) => (
              <Comment key={comment._id} comment={comment} onCommentDeleted={handlers.commentDeleted} />
            )) : !isFetching && (
              <StyledNoCommentsText>
                No comments
              </StyledNoCommentsText>
            )
          }
          {
            isFetching ? (
              <StyledSpinner size='md' />
            ) : <>
              <StyledErrorMessage type={errorType} />
              <StyledLoadMoreBtn type='button' onClick={handlers.loadMoreBtnClick}>
                add
              </StyledLoadMoreBtn>
            </>
          }
        </StyledList>


        <StyledCreateCommentForm postId={idOfPostViewingComments} onNewCommentCreated={handlers.newCommentCreated} />

      </StyledWrapper>      
    </Modal>
  )
}

const StyledWrapper = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  flex-direction: column;
`

const StyledList = styled.ul`
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  overflow-y: auto;
`

const StyledLoadMoreBtn = styled(IconButton)`
  flex: 0 0 auto;
  align-self: center;
`

const StyledCreateCommentForm = styled(CreateCommentForm)`
  margin-top: auto;
`

const StyledSpinner = styled(Spinner)`
  flex: 0 0 auto;
  align-self: center;
`

const StyledErrorMessage = styled(ErrorMessage)`
  align-self: center;
`

const StyledNoCommentsText = styled.span`
  align-self: center;
  font-weight: 600;
`

export default CommentsModal
