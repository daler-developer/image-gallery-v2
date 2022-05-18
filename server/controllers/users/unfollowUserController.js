const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const unfollowUserController = async (req, res, next) => {
  try {
    const currentUser = req.user
    const userId = new ObjectId(req.params._id)
    
    const userUnfollowing = await collections.users.findOne({ _id: userId })

    if (!userUnfollowing) {
      throw new RequestError(404, errorTypes.USERS_USER_DOES_NOT_EXIST)
    }

    // check if user is not yet following this user
    if (!currentUser.followings.find((_id) => _id.equals(userId))) {
      throw new RequestError(500, errorTypes.USERS_NOT_FOLLOWING_USER_YET)
    }

    await collections.users.updateOne({ _id: currentUser._id }, { $pull: { followings: userUnfollowing._id } })

    return res.status(200).end()
  } catch (e) {
    return next(e)
  }
}

module.exports = unfollowUserController
