import { useDispatch, useSelector } from 'react-redux'
import { authActions, selectCurrentUser } from '../redux/reducers/authReducer'

const useAuth = () => {
  const currentUser = useSelector((state) => selectCurrentUser(state))

  const dispatch = useDispatch()

  const login = async ({ username, password }) => {
    return dispatch(authActions.login({ username, password })).unwrap()
  }

  const register = async ({ username, password }) => {
    return dispatch(authActions.register({ username, password })).unwrap()
  }

  const logout = () => {
    localStorage.removeItem('auth-token')

    window.location.reload()
  }

  return {
    currentUser,
    login,
    logout,
    register
  }
}

export default useAuth
