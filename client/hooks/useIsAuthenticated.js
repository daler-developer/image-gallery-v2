import { selectCurrentUser } from '../redux/reducers/authReducer'
import { useSelector } from 'react-redux'

const useIsAuthenticated = () => {
  const currentUser = useSelector((state) => selectCurrentUser(state))

  return Boolean(currentUser)
}

export default useIsAuthenticated
