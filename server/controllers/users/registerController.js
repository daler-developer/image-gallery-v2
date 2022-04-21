const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')
const { generateAuthToken } = require('../../utils/helpers')

const registerController = async (req, res) => {
  try {
    const { username, password } = req.body

    const candidate = await collections.users.findOne({ username })

    if (candidate) {
      return res.status(400).json({ errorType: errorTypes.USERS_USER_WITH_SAME_USERNAME_EXISTS })
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
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = registerController
