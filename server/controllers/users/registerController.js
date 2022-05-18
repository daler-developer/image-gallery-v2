const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')
const { generateAuthToken } = require('../../utils/helpers')
const RequestError = require('../../utils/RequestError')

const registerController = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const candidate = await collections.users.findOne({ username })

    if (candidate) {
      throw new RequestError(400, errorTypes.USERS_USER_WITH_SAME_USERNAME_EXISTS)
    }

    const { insertedId } = await collections.users.insertOne({
      username,
      password,
      followings: []
    })

    const user = await collections.users.findOne({ _id: insertedId }, { projection: { password: 0 } })
    const token = generateAuthToken(insertedId.toString())

    return res.status(202).json({ user, token })
  } catch (e) {
    return next(e)
  }
}

module.exports = registerController
