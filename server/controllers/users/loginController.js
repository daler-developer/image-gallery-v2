const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')
const { generateAuthToken } = require('../../utils/helpers')

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await collections.users.findOne({ username })

    if (!user) {
      return res.status(404).json({ errorType: errorTypes.USERS_USER_DOES_NOT_EXIST })
    }

    if (user.password !== password) {
      return res.status(404).json({ errorType: errorTypes.AUTH_INVALID_PASSWORD })
    }

    const token = generateAuthToken(user._id.toString())

    return res.status(200).json({ user, token })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errorType: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = loginController
