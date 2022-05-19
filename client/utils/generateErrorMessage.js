
const AUTH_NOT_AUTHENTICATED = 'AUTH/NOT_AUTHENTICATED'
const AUTH_INVALID_TOKEN = 'AUTH/INVALID_TOKEN'
const AUTH_PERMISSION_DENIED = 'AUTH/PERMISSION_DENIED'
const AUTH_INVALID_PASSWORD = 'AUTH/INVALID_PASSWORD'

const COMMON_SERVER_ERROR = 'COMMON/SERVER_ERROR'
const COMMON_VALIDATION_ERROR = 'COMMON/VALIDATION_ERROR'

const USERS_USER_WITH_SAME_USERNAME_EXISTS = 'USERS/USER_WITH_SAME_USERNAME_EXISTS'
const USERS_USER_DOES_NOT_EXIST = 'USERS/USER_DOES_NOT_EXIST'
const USERS_ALREADY_FOLLOWING_USER = 'USERS/ALREADY_FOLLOWING'
const USERS_NOT_FOLLOWING_USER_YET = 'USERS/NOT_FOLLOWING_YET'

const POSTS_POST_NOT_FOUND = 'POSTS/NOT_FOUND'
const POSTS_ALREADY_LIKED_POST = 'POSTS/ALREADY_LIKED'
const POSTS_DID_NOT_LIKE_POST_YET = 'POSTS/DID_NOT_LIKE_YET'
const POSTS_FORBIDDEN_TO_DELETE_POST = 'POSTS/FORBIDDEN_TO_DELETE'

const errorMessages = {

  [POSTS_FORBIDDEN_TO_DELETE_POST]: "Cannot delete someone's post",
  [POSTS_POST_NOT_FOUND]: 'Post was not found',
  [POSTS_ALREADY_LIKED_POST]: 'You already liked this post',
  [POSTS_DID_NOT_LIKE_POST_YET]: 'you did not yet like this post',

  [USERS_USER_WITH_SAME_USERNAME_EXISTS]: 'User with this username already exists',
  [USERS_USER_DOES_NOT_EXIST]: 'This user does not exist',
  [USERS_ALREADY_FOLLOWING_USER]: 'You are already following this user',
  [USERS_NOT_FOLLOWING_USER_YET]: 'You are not yet following this user',

  [COMMON_SERVER_ERROR]: 'Server error',
  [COMMON_VALIDATION_ERROR]: 'Invalid data passed to server',

  [AUTH_INVALID_TOKEN]: 'Invalid token',
  [AUTH_NOT_AUTHENTICATED]: 'Not authenticated',
  [AUTH_PERMISSION_DENIED]: 'Permission denied',
  [AUTH_INVALID_PASSWORD]: 'Incorrect password'

}

const generateErrorMessage = (errorType) => {
  return errorMessages[errorType]
}

export default generateErrorMessage
