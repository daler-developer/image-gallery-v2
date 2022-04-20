const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')

const getUsersController = async (req, res) => {
  try {
    const currentUser = req.user
    const { limit = 10, offset = 0 } = req.query

    const users = await collections.users.aggregate([
      {
        $match: {
          _id: {
            $ne: currentUser._id     
          }
        }
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
        $limit: limit
      },
      {
        $unset: ['followings']
      }
    ]).toArray()

    return res.status(200).json({ users })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = getUsersController
