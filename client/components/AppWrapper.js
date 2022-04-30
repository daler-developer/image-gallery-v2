import pt from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, selectIsLoadingCurrentUser } from '../redux/reducers/authReducer'
import FullScreenLoader from './common/FullScreenLoader'
import AuthProtected from './common/AuthProtected'
import UpdateProfileModal from './UpdateProfileModal'
import CommentsModal from './CommentsModal'
import AddPostModal from './AddPostModal'

const AppWrapper = ({ children }) => {
  const isLoadingCurrentUser = useSelector((state) => selectIsLoadingCurrentUser(state))

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(authActions.fetchCurrentUser())
    }
  }, [])

  if (isLoadingCurrentUser) {
    return <FullScreenLoader />
  }

  return <>
    {children}
    <AuthProtected>
      <AddPostModal />
      {/* <UpdateProfileModal /> */}
      <CommentsModal />
    </AuthProtected>
  </>
}

AppWrapper.propTypes = {
  children: pt.any.isRequired
}

export default AppWrapper
