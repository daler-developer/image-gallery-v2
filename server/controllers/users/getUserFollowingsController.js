const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const getUserFollowingsController = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params._id)
    const offset = req.query.offset || 0
    const currentUser = req.user

    const user = await collections.users.findOne({ _id: userId })

    const numPosts = (await collections.posts.find({ creatorId: userId }).toArray()).length
    const numFollowers = (await collections.users.find({ followings: { $all: [userId] } }).toArray()).length

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
        $set: {
          numFollowings: { $size: '$followings' },
          numFollowers,
          numPosts,
          isCurrentUser: { $eq: [currentUser._id, '$_id'] },
          currentUserFollows: {
            $cond: {
              if: { $eq: [currentUser._id, '$_id'] },
              then: null,
              else: { $in: ['$_id', currentUser.followings] }
            }
          }
        }
      },
      {
        $limit: 5
      },
      {
        $unset: ['followings']
      }
    ]).toArray()

    return res.status(202).json({ followings })
  } catch (e) {
    return next(e)
  }
}

module.exports = getUserFollowingsController
