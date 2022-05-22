const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')

const getCurrentUserController = async (req, res, next) => {
  try {
    const currentUser = req.user

    const usersFound = await collections.users.aggregate([
      {
        $match: { _id: currentUser._id }
      },
      {
        $unset: ['followings', 'password']
      }
    ]).toArray()

    return res.status(200).json({ user: usersFound[0] })
  } catch (e) {
    return next(e)
  }
}

module.exports = getCurrentUserController
