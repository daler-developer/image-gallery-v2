const { ObjectId } = require("mongodb")
const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const getUsersController = async (req, res, next) => {
  try {
    const currentUser = req.user
    const { offset = 0 } = req.query
    const postLikedId = req.query.postLikedId ? new ObjectId(req.query.postLikedId) : null

    let pipelines = []

    // throw new RequestError(404, errorTypes.USERS_CANNOT_FOLLOW_ONESELF)

    if (postLikedId) {
      const post = await collections.posts.findOne({ _id: postLikedId })
    
      pipelines.push({
        $match: {
          _id: {
            $in: post.likes
          }
        }
      })
    }

    pipelines = pipelines.concat([
      {
        $skip: offset
      },
      {
        $set: {
          numFollowings: { $size: '$followings' },
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
        $limit: 2
      },
      {
        $unset: ['followings']
      }
    ])

    const users = await collections.users.aggregate(pipelines).toArray()

    return res.status(200).json({ users })
  } catch (e) {
    return next(e)
  }
}

module.exports = getUsersController
