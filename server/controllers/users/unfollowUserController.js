const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const { ObjectId } = require('mongodb')

const unfollowUserController = async (req, res) => {
  try {
    const currentUser = req.user
    const { _id } = req.params
    
    const userUnfollowing = await collections.users.findOne({ _id: new ObjectId(_id) })

    if (!userUnfollowing) {
      return res.status(500).json({ type: errorTypes.USERS_USER_DOES_NOT_EXIST})
    }

    // check if user is not yet following this user
    if (!currentUser.followings.find((follow) => follow.toString() === _id)) {
      return res.status(500).json({ type: errorTypes.USERS_NOT_FOLLOWING_YET })
    }

    await collections.users.updateOne({ _id: currentUser._id }, { $pull: { followings: userUnfollowing._id } })

    return res.status(200).end()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = unfollowUserController
