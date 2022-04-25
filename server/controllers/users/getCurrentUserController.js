const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')

const getCurrentUserController = async (req, res) => {
  try {
    const currentUser = req.user

    const usersFound = await collections.users.aggregate([
      {
        $match: { _id: currentUser._id }
      },
      {
        $unset: ['followings']
      }
    ]).toArray()

    return res.status(200).json({ user: usersFound[0] })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = getCurrentUserController
