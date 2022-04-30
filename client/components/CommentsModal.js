import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectActiveModal, selectIdOfPostViewingComments, uiActions } from '../redux/reducers/uiReducer'
import Modal from './common/Modal'
import { useFormik } from 'formik'
import Input from './common/Input'
import Button from './common/Button'
import Comment from './common/Comment'
import * as api from '../utils/api'
import Spinner from './common/Spinner'
import CreateCommentForm from './common/CreateCommentForm'

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
  
      const { data } = await api.getComments({ postId: idOfPostViewingComments, offset: 0 })
  
      setComments(data.comments)
    } catch (e) {
      setErrorType(e.response.data.errorType)
    } finally {
      setIsFetching(false)
    }
  }
  
  const handlers = {
    newCommentCreated(comment) {
      setComments([...comments, comment])
    }
  }

  return (
    <Modal title='Comments' isHidden={isHidden}>
      <StyledWrapper>

        <StyledList>
          {
            isFetching ? (
              <StyledSpinner size='md' />
            ) : errorType ? (
              <span>{errorType}</span>
            ) : comments.length === 0 ? (
              <StyledNoCommentsText>
                No comments yet:(
              </StyledNoCommentsText>
            ) : (      
              comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))  
            )
          }
        </StyledList>

        <CreateCommentForm postId={idOfPostViewingComments} onNewCommentCreated={handlers.newCommentCreated} />

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
  flex: 1 0 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  overflow-y: auto;
`

const StyledSpinner = styled(Spinner)`
  align-self: center;
`

const StyledNoCommentsText = styled.span`
  align-self: center;
`

const StyledForm = styled.form`
  flex: 0 0 40px;
  display: flex;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`

const StyledSubmitBtn = styled(Button)`
  flex: 0 0 auto;
`

const StyledInput = styled(Input)`
  flex: 1 0 0;
`

export default CommentsModal
