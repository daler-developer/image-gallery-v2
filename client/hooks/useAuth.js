import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/reducers/authReducer'

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
    dispatch(authActions.setCurrentUser(null))
    
    localStorage.removeItem('auth-token')
  }

  return {
    currentUser,
    login,
    logout,
    register
  }
}

export default useAuth
