const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')
const { generateAuthToken } = require('../../utils/helpers')
const RequestError = require('../../utils/RequestError')

const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await collections.users.findOne({ username })

    if (!user) {
      throw new RequestError(404, errorTypes.USERS_USER_DOES_NOT_EXIST)
    }

    if (user.password !== password) {
      throw new RequestError(404, errorTypes.AUTH_INVALID_PASSWORD)
    }

    const token = generateAuthToken(user._id.toString())

    return res.status(200).json({ user, token })
  } catch (e) {
    return next(e)
  }
}

module.exports = loginController
