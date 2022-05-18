const { ObjectId } = require('mongodb')
const collections = require('../../../db/collections')
const errorTypes = require('../../../utils/errorTypes')
const RequestError = require('../../../utils/RequestError')

const getCommentsController = async (req, res, next) => {
  try {
    const params = req.params
    const postId = new ObjectId(params.postId)

    const post = await collections.posts.findOne({ _id: postId })

    if (!post) {
      throw new RequestError(404, errorTypes.POSTS_POST_NOT_FOUND)
    }

    const foundComments = await collections.comments.aggregate([
      {
        $match: {
          _id: { $in: post.comments }
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
          creator: { $first: '$creators' }
        }
      },
      {
        $unset: ['creators', 'creator.password', 'creator.followings']
      }
    ]).toArray()

    return res.status(200).json({ comments: foundComments })
  } catch (e) {
    return next(e)
  }
}

module.exports = getCommentsController

