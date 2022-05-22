const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const getUserController = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params._id)
    const currentUser = req.user

    const numPosts = (await collections.posts.find({ creatorId: userId }).toArray()).length
    const numFollowers = (await collections.users.find({ followings: { $all: [userId] } }).toArray()).length
    
    const users = await collections.users.aggregate([
      {
        $match: {
          _id: userId
        } 
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
        $unset: ['followings']
      }
    ]).toArray()

    if (!users.length) {
      throw new RequestError(404, errorTypes.USERS_USER_DOES_NOT_EXIST)
    }
    
    return res.status(200).json({ user: users[0] })
  } catch (e) {
    return next(e)
  }
}

module.exports = getUserController
