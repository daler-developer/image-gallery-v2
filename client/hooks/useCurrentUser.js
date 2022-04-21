import { useSelector } from "react-redux"
import { selectCurrentUser } from "../redux/reducers/authReducer"

const useCurrentUser = () => {
  const currentUser = useSelector((state) => selectCurrentUser(state))

  return currentUser
}

export default useCurrentUser
