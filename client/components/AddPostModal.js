import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Image from 'next/image'
import { selectActiveModal } from '../redux/reducers/uiReducer'
import Modal from './common/Modal'
import { useEffect, useMemo, useRef, useState } from 'react'
import Button from './common/Button'
import Input from './common/Input'
import IconButton from './common/IconButton'
import * as yup from 'yup'
import { postsActions } from '../redux/reducers/postsReducer'

const AddPostModal = ({}) => {
  const [image, setImage] = useState(null)
  const [errorType, setErrorType] = useState(null)

  const imageUrl = useMemo(() => image ? URL.createObjectURL(image) : null, [image])

  const isHidden = useSelector((state) => selectActiveModal(state)) !== 'add-post'

  const fileInputRef = useRef(null)

  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: yup.object({
      text: yup.string().trim().required().min(1).max(100)
    }),
    async onSubmit(v) {
      try {
        await dispatch(postsActions.created({ image, text: v.text })).unwrap()

        resetAll()
      } catch (e) {
        setErrorType(e.response.data.errorType)
      } finally {
        form.resetForm()
      }
    }
  })

  useEffect(() => {
    if (isHidden) {
      resetAll()
    }
  }, [isHidden])

  const resetAll = () => {
    form.resetForm()
    setImage(null)
    fileInputRef.current && (fileInputRef.current.value = '')
  }

  const handlers = {
    imageInputChange(e) {
      setImage(e.target.files[0])
    },
    removeImageBtnClick() {
      setImage(null)
      fileInputRef.current && (fileInputRef.current.value = '')
    }
  }

  return <>
    <Modal isHidden={isHidden} title='Create'>
      <StyledForm onSubmit={form.handleSubmit}>
        
        <Input
          size='md'
          inputProps={{
            placeholder: 'Text',
            ...form.getFieldProps('text')
          }}
        />

        {
          image ? (
            <StyledImageWrapper>
              <Image layout='fill' src={imageUrl} />
              <StyledRemoveImageBtn size='md' color='red' onClick={handlers.removeImageBtnClick}>
                close
              </StyledRemoveImageBtn>
            </StyledImageWrapper>
          ) : (
            <StyledUploadBtn color='grey' type='button' size='md' onClick={() => fileInputRef.current?.click()}>
              Upload
            </StyledUploadBtn>
          )
        }
        
        <StyledSubmitBtn color='blue' size='md' type='submit' isLoading={form.isSubmitting}>
          Create
        </StyledSubmitBtn>

      </StyledForm>

      <input type="file" ref={fileInputRef} hidden onChange={handlers.imageInputChange} />
    </Modal>
  </>
}

const StyledForm = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const StyledUploadBtn = styled(Button)`
  margin-top: 2px;
`

const StyledImageWrapper = styled.div`
  margin-top: 5px;
  position: relative;
  aspect-ratio: 1 / 1;
  border: 1px solid black;
  border-radius: 3px;
  overflow: hidden;
`

const StyledRemoveImageBtn = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
`

const StyledSubmitBtn = styled(Button)`
  margin-top: 30px;
`

export default AddPostModal
