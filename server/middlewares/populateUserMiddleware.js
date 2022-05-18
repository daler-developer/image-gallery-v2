const { ObjectId } = require('mongodb')
const errorTypes = require('../utils/errorTypes')
const collections = require('../db/collections')
const { decodeAuthToken } = require('../utils/helpers')
const RequestError = require('../utils/RequestError')

const populateUserMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    let decoded

    if (!token) {
      throw new RequestError(400, errorTypes.AUTH_NOT_AUTHENTICATED)
    }

    try {
      decoded = decodeAuthToken(token)
    } catch (e) {
      throw new RequestError(400, errorTypes.AUTH_INVALID_TOKEN)
    }

    const user = await collections.users.findOne({ _id: new ObjectId(decoded.userId) })

    req.user = user

    return next()
  } catch (e) {
    return next(e)
  }
}

module.exports = populateUserMiddleware
