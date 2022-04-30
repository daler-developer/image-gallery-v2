const { ObjectId } = require("mongodb")
const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')

const getUsersController = async (req, res) => {
  try {
    const currentUser = req.user
    const { offset = 0, excludeCurrent = true } = req.query
    const postLikedId = req.query.postLikedId ? new ObjectId(req.query.postLikedId) : null
    const currentUserId = new ObjectId(currentUser._id)

    let pipelines = []

    let $match = {
      $and: []
    }

    if (excludeCurrent) {
      $match.$and.push({
        _id: {
          $ne: currentUserId
        }
      })
    }

    if (postLikedId) {
      const post = await collections.posts.findOne({ _id: postLikedId })

      $match.$and.push({
        _id: {
          $in: post.likes
        }
      })
    }

    pipelines = pipelines.concat([
      {
        $match
      },
      {
        $skip: offset
      },
      {
        $set: {
          numFollowings: { $size: '$followings' },
          currentUserFollows: { $in: ['$_id', currentUser.followings] }
        }
      },
      {
        $limit: 10
      },
      {
        $unset: ['followings']
      }
    ])

    const users = await collections.users.aggregate(pipelines).toArray()

    return res.status(200).json({ users })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = getUsersController
