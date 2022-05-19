import { useFormik } from 'formik'
import pt from 'prop-types'
import styled from 'styled-components'
import Button from './Button'
import Input from './Input'
import * as yup from 'yup'
import { postsActions } from '../../redux/reducers/postsReducer'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'

const CreateCommentForm = ({ postId, onNewCommentCreated, ...rest }) => {
  const inputRef = useRef(null)

  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: yup.object({
      text: yup.string().trim().required().min(1).max(15)
    }),
    async onSubmit(v) {
      try {
        const { comment } = await dispatch(postsActions.commentCreated({ postId, text: v.text })).unwrap()

        onNewCommentCreated && onNewCommentCreated(comment)
      } catch (e) {
        alert('daler')
      } finally {
        form.resetForm()
      }
    }
  })

  return (
    <StyledWrapper onSubmit={form.handleSubmit} {...rest}>
      <StyledCommentTextInput
        inputProps={{
          placeholder: 'Text',
          ...form.getFieldProps('text')
        }}
        ref={inputRef}
      />
      <StyledLeaveCommentBtn type='submit' isLoading={form.isSubmitting} roundedBorder={false}>
        Create
      </StyledLeaveCommentBtn>
    </StyledWrapper>
  )
}

CreateCommentForm.propTypes = {
  onNewCommentCreated: pt.func
}

const StyledWrapper = styled.form`
  display: flex;
`

const StyledCommentTextInput = styled(Input)`
  flex: 1 0 0;
`

const StyledLeaveCommentBtn = styled(Button)`
  flex: 0 0 100px;
  height: initial;
`


export default CreateCommentForm
