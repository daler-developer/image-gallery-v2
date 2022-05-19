const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const getUserFollowersController = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params._id)
    const offset = req.query.offset || 0

    const user = await collections.users.findOne({ _id: userId })

    if (!user) {
      throw new RequestError(404, errorTypes.USERS_USER_DOES_NOT_EXIST)
    }

    const followers = await collections.users.aggregate([
      {
        $match: {
          followings: { $all: [user._id] }
        }
      },
      {
        $skip: offset
      },
      {
        $limit: 5
      }
    ]).toArray()

    return res.status(202).json({ followers })
  } catch (e) {
    return next(e)
  }
}

module.exports = getUserFollowersController
