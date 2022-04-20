const jwt = require('jsonwebtoken')

const generateAvatarFileUrl = (filename) => {
  return `/api/uploads/avatars/${filename}`
}

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2 days' })
}

const decodeAuthToken = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET)
}

const compareObjectIds = (a, b) => {
  if (a.toString() === b.toString()) {
    return true
  }

  return false
}

module.exports = {
  generateAvatarFileUrl,
  generateAuthToken,
  decodeAuthToken,
  compareObjectIds
}
