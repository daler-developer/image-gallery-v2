const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')
const errorTypes = require('../utils/errorTypes')
const collections = require('../db/collections')
const { decodeAuthToken } = require('../utils/helpers')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    let decoded

    if (!token) {
      return res.status(402).json({ errorType: errorTypes.AUTH_NOT_AUTHENTICATED })
    }

    try {
      decoded = decodeAuthToken(token)
    } catch (e) {
      return res.status(502).json({ errorType: errorTypes.AUTH_INVALID_TOKEN })
    }

    const user = await collections.users.findOne({ _id: new ObjectId(decoded.userId) })

    req.user = user

    return next()

  } catch (e) {
    return res.status(502).json({ errorType: errorTypes.COMMON_SERVER_ERROR })
  }
}
