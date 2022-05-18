const { ObjectId } = require("mongodb")
const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const followUserController = async (req, res, next) => {
  try {
    const currentUser = req.user
    const userId = new ObjectId(req.params._id)
    
    const userFollowing = await collections.users.findOne({ _id: userId })

    if (!userFollowing) {
      throw new RequestError(404, errorTypes.USERS_USER_DOES_NOT_EXIST)
    }

    // check if current user is already following this user
    if (currentUser.followings.find((_id) => _id.equals(userId))) {
      throw new RequestError(400, errorTypes.USERS_ALREADY_FOLLOWING_USER)
    }

    await collections.users.updateOne({ _id: currentUser._id }, { $push: { followings: userFollowing._id } })

    return res.status(200).end()
  } catch (e) {
    return next(e)
  }
}

module.exports = followUserController
