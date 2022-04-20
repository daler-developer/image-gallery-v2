const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')

const getUserController = async (req, res) => {
  try {
    const { _id } = req.params
    const currentUser = req.user
    
    const users = await collections.users.aggregate([
      {
        $match: {
          _id: new ObjectId(_id)
        } 
      },
      {
        $set: {
          numFollowings: { $size: '$followings' },
          currentUserFollows: { $in: ['$_id', currentUser.followings] }
        }
      },
      {
        $unset: ['followings']
      }
    ]).toArray()

    if (!users.length) {
      return res.status(500).json({ type: errorTypes.USERS_USER_DOES_NOT_EXIST})
    }
    
    return res.status(200).json({ user: users[0] })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = getUserController
