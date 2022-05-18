const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const searchPostsController = async (req, res, next) => {
  try {
    const searchQuery = req.query.query
    const offset = req.query.offset || 0
    const currentUser = req.user

    const posts = await collections.posts.aggregate([
      {
        $match: {
          text: { $regex: new RegExp(searchQuery, 'i') }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creators'
        }
      },
      {
        $set: {
          creator: { $first: '$creators' },
          numLikes: { $size: '$likes' },
          numComments: { $size: '$comments' },
          likedByCurrentUser: { $in: [currentUser._id, '$likes'] },
          isCreatedByCurrentUser: { $eq: [currentUser._id, '$creatorId'] }
        }
      },
      {
        $unset: ['likes', 'comments', 'creatorId', 'creators', 'creator.password', 'creator.followings']
      },
      {
        $skip: offset
      },
      {
        $limit: 5
      }
    ]).toArray()

    return res.status(200).json({ posts })
  } catch (e) {
    return next(e)
  }
}

module.exports = searchPostsController
