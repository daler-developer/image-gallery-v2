import styled from 'styled-components'
import Modal from './common/Modal'
import { useFormik } from 'formik'
import Input from './common/Input'
import Button from './common/Button'
import Avatar from './common/Avatar'
import useCurrentUser from '../hooks/useCurrentUser'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/reducers/authReducer'
import { selectActiveModal } from '../redux/reducers/uiReducer'

const UpdateProfileModal = ({}) => {
  const [avatar, setAvatar] = useState(null)
  const [isRemoveAvatarSelected, setIsRemoveAvatarSelected] = useState(false)

  const isHidden = useSelector((state) => selectActiveModal(state)) !== 'update-profile'

  const currentUser = useCurrentUser()

  const avatarInputRef = useRef(null)

  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      username: ''
    },
    async onSubmit(v) {
      const fields = {}

      if (v.username !== currentUser.username) {
        fields.username = v.username
      }

      if (isRemoveAvatarSelected) {
        fields.removeAvatar = 'yes'
      } else if (avatar) {
        fields.avatar = avatar
      }
      
      await dispatch(authActions.profileUpdated(fields))
    }
  })

  useEffect(() => {
    form.setValues({ username: currentUser.username })
  }, [currentUser])

  const handlers = {
    changeAvatarBtnClick() {
      avatarInputRef.current?.click()
    },
    avatarInputChange(e) {
      setAvatar(e.target.files[0])
    },
    removeAvatarBtnClick() {
      setIsRemoveAvatarSelected(true)
    }
  }

  return <>
    <Modal isHidden={isHidden} title='Update profile'>
      <StyledForm onSubmit={form.handleSubmit}>

        <Input
          inputProps={{
            placeholder: 'Username',
            ...form.getFieldProps('username')
          }}
        />

        <StyledAvatarWrapper>
          {
            avatar ? (
              <StyledAvatar
                src={URL.createObjectURL(avatar)}
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
