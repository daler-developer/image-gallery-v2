import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import * as yup from 'yup'
import { useEffect } from 'react'
import Button from '../../components/common/Button'
import useLogin from '../../hooks/useLogin'
import useRegister from '../../hooks/useRegister'
import useCurrentUser from '../../hooks/useCurrentUser'
import generateErrorMessage from '../../utils/generateErrorMessage'
import Input from '../../components/common/Input'
import FullScreenLoader from '../../components/common/FullScreenLoader'

const Auth = () => {
  const router = useRouter()

  const currentUser = useCurrentUser()

  useEffect(() => {
    if (currentUser.isAuthenticated) {
      router.push('/home')
    }
  }, [currentUser.isAuthenticated])

  const login = useLogin()
  const register = useRegister()

  const tab = router.query.tab

  const form = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object({
      username: yup.string().required('required').min(3, 'Min 3').max(15, 'Max 15'),
      password: yup.string().required('required').min(3, 'Min 3').max(15, 'Max 15')
    }),
    async onSubmit({ username, password }) {
      try {
        if (tab === 'login') {
          await login.mutateAsync({ username, password })
        } else if (tab === 'register') {
          await register.mutateAsync({ username, password })
        }
      } catch (e) {
        alert('error')
      } finally {
        form.resetForm()
      }
    }
  })

  return (
    <StyledWrapper>
      <StyledForm onSubmit={form.handleSubmit}>

        <Input
          error={form.touched.username && form.errors.username}
          inputProps={{
            placeholder:'Username',
            ...form.getFieldProps('username')
          }}
        />

        <Input
          error={form.touched.password && form.errors.password}
          inputProps={{
            placeholder:'Password',
            ...form.getFieldProps('password')
          }}
        />

        {
          login.error && (
            <StyledErrorMessage>
              {generateErrorMessage(login.errorType)}
            </StyledErrorMessage>
          )
        }

        {
          tab === 'login' ? (
            <StyledSubmitBtn type='submit' isLoading={form.isSubmitting}>
              Login
            </StyledSubmitBtn>
          ) : (
            <StyledSubmitBtn type='submit' isLoading={form.isSubmitting}>
              Register
            </StyledSubmitBtn>
          )
        }
 
        {
          tab === 'login' ? (
            <StyledLinkWrapper>
              Don't have an account? <Link href={'/auth?tab=register'}>Register</Link>
            </StyledLinkWrapper>
          ) : (
            <StyledLinkWrapper href={'/auth?tab=login'}>
              Already have an account? <Link href={'/auth?tab=login'}>Login</Link>
            </StyledLinkWrapper>
          )
        }

      </StyledForm>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledForm = styled.form`
  padding: 10px;
  max-width: 400px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

const StyledSubmitBtn = styled(Button)`
  margin-top: 30px;
`

const StyledLinkWrapper = styled.div`
  margin-top: 10px;
  text-align: center;
`

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`

export default Auth
