import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { selectActiveModal } from '../redux/reducers/uiReducer'
import Modal from './common/Modal'

const CreatePostModal = ({}) => {
  const isHidden = useSelector((state) => selectActiveModal(state)) !== 'create-post'

  const form = useFormik({

  })

  return (
    <Modal title='Create post' isHidden={isHidden}>
      <StyledForm onSubmit={form.handleSubmit}>

      </StyledForm>
    </Modal>
  )
}

const StyledForm = styled.form`
  
`

export default CreatePostModal
