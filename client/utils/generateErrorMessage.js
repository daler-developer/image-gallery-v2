
const AUTH_INVALID_PASSWORD = 'AUTH/INVALID_PASSWORD'

const USERS_USER_DOES_NOT_EXIST = 'USERS/USER_DOES_NOT_EXIST'

const COMMON_SERVER_ERROR = 'COMMON/SERVER_ERROR'
const COMMON_VALIDATION_ERROR = 'COMMON/VALIDATION_ERROR'

const generateErrorMessage = (errorType) => {
  switch (errorType) {
    case AUTH_INVALID_PASSWORD:
      return 'Incorrect password!'
    case USERS_USER_DOES_NOT_EXIST:
      return 'User does not exist'
    case COMMON_SERVER_ERROR:
      return 'Unknown error'
    case COMMON_VALIDATION_ERROR:
      return 'Invalid data'
  }
}

export default generateErrorMessage
