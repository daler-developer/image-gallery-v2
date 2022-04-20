import styled from 'styled-components'
import Modal from './common/Modal'
import { useFormik } from 'formik'
import Input from './common/Input'
import Button from './common/Button'
import useUpdateProfile from '../hooks/useUpdateProfile'
import useCurrentUser from '../hooks/useCurrentUser'
import { useEffect } from 'react'

const UpdateProfileModal = ({}) => {
  const updateProfile = useUpdateProfile()

  const currentUser = useCurrentUser()

  const form = useFormik({
    initialValues: {
      username: ''
    },
    async onSubmit(v) {
      await updateProfile.mutateAsync({ username: v.username })
    }
  })

  useEffect(() => {
    form.setValues({ username: currentUser.user.username })
  }, [currentUser.user])

  return (
    <Modal isHiden={false} title='Update profile'>
      <StyledForm onSubmit={form.handleSubmit}>

        <Input
          inputProps={{
            placeholder: 'Username',
            ...form.getFieldProps('username')
          }}
        />

        <Button type='submit' size='md' isLoading={form.isSubmitting}>
          Update
        </Button>

      </StyledForm>
    </Modal>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

export default UpdateProfileModal
