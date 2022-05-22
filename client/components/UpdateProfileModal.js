import styled from 'styled-components'
import Modal from './common/Modal'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Input from './common/Input'
import Button from './common/Button'
import Avatar from './common/Avatar'
import useCurrentUser from '../hooks/useCurrentUser'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/reducers/authReducer'
import { selectActiveModal, uiActions } from '../redux/reducers/uiReducer'
import ErrorMessage from '../components/common/ErrorMessage'

const UpdateProfileModal = ({}) => {
  const [avatar, setAvatar] = useState(null)
  const [isRemoveAvatarSelected, setIsRemoveAvatarSelected] = useState(false)
  const [errorType, setErrorType] = useState(null)

  const avatarUrl = useMemo(() => avatar ? URL.createObjectURL(avatar) : null, avatar)

  const isHidden = useSelector((state) => selectActiveModal(state)) !== 'update-profile'

  const currentUser = useCurrentUser()

  const avatarInputRef = useRef(null)

  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      username: ''
    },
    validationSchema: yup.object({
      username: yup.string().trim().required('required').min(3, 'min 3').max(15, 'max 15')
    }),
    async onSubmit(v) {
      try {
        const fields = {}

        if (v.username !== currentUser.username) {
          fields.username = v.username
        }

        if (isRemoveAvatarSelected) {
          fields.removeAvatar = 'yes'
        } else if (avatar) {
          fields.avatar = avatar
        }
        
        await dispatch(authActions.profileUpdated(fields)).unwrap()

        dispatch(uiActions.changedActiveModal(null))
      } catch (e) {
        setErrorType(e.errorType)
      } finally {
        resetImage()
      }
    }
  })
  
  useEffect(() => {
    if (isHidden) {
      resetImage()
      form.resetForm()
    } else {
      form.setValues({ username: currentUser.username })
    }
  }, [isHidden])

  const resetImage = () => {
    setAvatar(null)
    setIsRemoveAvatarSelected(false)
    setErrorType(null)
  }

  const handlers = {
    changeAvatarBtnClick() {
      avatarInputRef.current?.click()
    },
    avatarInputChange(e) {
      setAvatar(e.target.files[0])
      setIsRemoveAvatarSelected(false)
    },
    removeAvatarBtnClick() {
      setIsRemoveAvatarSelected(true)
    }
  }

  return <>
    <Modal isHidden={isHidden} title='Update profile'>
      <StyledForm onSubmit={form.handleSubmit}>

        <Input
          error={form.touched.username && form.errors.username}
          inputProps={{
            placeholder: 'Username',
            ...form.getFieldProps('username')
          }}
        />

        <StyledAvatarWrapper>
          {
            isRemoveAvatarSelected ? (
              <StyledAvatar
                src={null}
                size='md'
              />
            ) : avatar ? (
              <StyledAvatar
                src={avatarUrl}
                size='md'
              />
            ) : (               
              <StyledAvatar
                src={currentUser.avatarUrl}
                size='md'
              />
            )
          }
          <StyledRemoveAvatarBtn size='sm' color='red' type='button' onClick={handlers.removeAvatarBtnClick}>
            remove
          </StyledRemoveAvatarBtn>
          <StyledChangeAvatarBtn size='sm' color='blue' type='button' onClick={handlers.changeAvatarBtnClick}>
            change
          </StyledChangeAvatarBtn>
        </StyledAvatarWrapper>

        {
          errorType && <ErrorMessage type={errorType} />
        }

        <StyledSubmitBtn type='submit' size='md' isLoading={form.isSubmitting}>
          Update
        </StyledSubmitBtn>

      </StyledForm>
    </Modal>

    <input type="file" ref={avatarInputRef} onChange={handlers.avatarInputChange} hidden />
  </>
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;
`

const StyledAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3px;
`

const StyledAvatar = styled(Avatar)`
  
`

const StyledChangeAvatarBtn = styled(Button)`
`

const StyledRemoveAvatarBtn = styled(Button)`
  margin-left: auto;
`

const StyledSubmitBtn = styled(Button)`
  margin-top: 20px;
`

export default UpdateProfileModal
