const { ObjectId } = require('mongodb')
const collections = require('../../../db/collections')
const errorTypes = require('../../../utils/errorTypes')
const RequestError = require('../../../utils/RequestError')

const createCommentController = async (req, res, next) => {
  try {
    const { text } = req.body
    const postId = new ObjectId(req.params.postId)
    const creatorId = new ObjectId(req.user._id)
    const currentUser = req.user

    const post = await collections.posts.findOne({ _id: postId })

    if (!post) {
      throw new RequestError(404, errorTypes.POSTS_POST_NOT_FOUND)
    }

    const { insertedId } = await collections.comments.insertOne({ text, creatorId })

    await collections.posts.updateOne({ _id: post._id }, { $push: { comments: insertedId } })

    const [comment] = await collections.comments.aggregate([
      {
        $match: {
          _id: insertedId
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
          isCreatedByCurrentUser: { $eq: [currentUser._id, '$creatorId'] }
        }
      },
      {
        $unset: ['creators', 'creator.password', 'creator.followings']
      }
    ]).toArray()

    return res.status(200).json({ comment })
  } catch (e) {
    return next(e)
  }
}

module.exports = createCommentController

