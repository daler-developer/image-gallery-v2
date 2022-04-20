const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')

const registerController = async (req, res) => {
  try {
    const { username, password } = req.body

    const candidate = await collections.users.findOne({ username })

    if (candidate) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const { insertedId } = await collections.users.insertOne({
      username,
      password,
      followings: []
    })

    const user = await collections.users.findOne({ _id: insertedId }, { projection: { password: 0 } })
    const token = jwt.sign({ userId: insertedId.toString() }, process.env.JWT_SECRET, { expiresIn: '2 days' })

    return res.status(202).json({ user, token })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = registerController
