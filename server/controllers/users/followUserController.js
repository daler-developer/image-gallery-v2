const { ObjectId } = require("mongodb")
const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')

const followUserController = async (req, res) => {
  try {
    const currentUser = req.user
    const { _id } = req.params
    
    const userFollowing = await collections.users.findOne({ _id: new ObjectId(_id) })

    if (!userFollowing) {
      return res.status(500).json({ type: errorTypes.USERS_USER_DOES_NOT_EXIST})
    }

    // check if current user is already following this user
    if (currentUser.followings.find((follow) => follow.toString() === _id)) {
      return res.status(500).json({ errorType: errorTypes.USERS_ALREADY_FOLLOWING })
    }

    await collections.users.updateOne({ _id: currentUser._id }, { $push: { followings: userFollowing._id } })

    return res.status(200).end()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = followUserController
