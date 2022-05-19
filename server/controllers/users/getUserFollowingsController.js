const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const getUserFollowingsController = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params._id)
    const offset = req.query.offset || 0

    const user = await collections.users.findOne({ _id: userId })

    if (!user) {
      throw new RequestError(404, errorTypes.USERS_USER_DOES_NOT_EXIST)
    }

    const followings = await collections.users.aggregate([
      { 
        $match: {
          _id: { $in: user.followings }
        }
      },
      {
        $skip: offset
      },
      {
        $limit: 5
      }
    ]).toArray()

    return res.json({ followings })
  } catch (e) {
    return next(e)
  }
}

module.exports = getUserFollowingsController
