import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/reducers/authReducer'
import ErrorMessage from '../../components/common/ErrorMessage'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'

const Auth = () => {
  const [errorType, setErrorType] = useState(null)

  const isAuthenticated = useIsAuthenticated()

  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(router.query.next || '/home')
    }
  }, [isAuthenticated])

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
          await dispatch(authActions.loggedin({ username, password })).unwrap()
        } else if (tab === 'register') {
          await dispatch(authActions.registered({ username, password })).unwrap()
        }
      } catch (e) {
        setErrorType(e.errorType)
      } finally {
        form.resetForm()
      }
    }
  })

  return (
    <StyledWrapper>
      <StyledForm onSubmit={form.handleSubmit}>

        <Input
          size='md'
          error={form.touched.username && form.errors.username}
          inputProps={{
            placeholder:'Username',
            ...form.getFieldProps('username')
          }}
        />

        <Input
          size='md'
          error={form.touched.password && form.errors.password}
          inputProps={{
            placeholder:'Password',
            ...form.getFieldProps('password')
          }}
        />

        {
          errorType && (
            <ErrorMessage type={errorType} />
          )
        }

        {
          tab === 'login' ? (
            <StyledSubmitBtn type='submit' size='md' isLoading={form.isSubmitting}>
              Login
            </StyledSubmitBtn>
          ) : (
            <StyledSubmitBtn type='submit' size='md' isLoading={form.isSubmitting}>
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
