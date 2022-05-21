const { ObjectId } = require('mongodb')
const collections = require('../../../db/collections')
const errorTypes = require('../../../utils/errorTypes')
const RequestError = require('../../../utils/RequestError')

const updateCommentController = async (req, res, next) => {
  try {
    console.log('log')
    const currentUser = req.user
    const commentId = new ObjectId(req.params._id)
    const text = req.body.text

  
    // throw new RequestError(400, errorTypes.COMMENTS_FORBIDDEN_TO_EDIT_COMMENT)

    if (!await collections.comments.findOne({ creatorId: currentUser._id })) {
      throw new RequestError(400, errorTypes.COMMENTS_FORBIDDEN_TO_EDIT_COMMENT)
    }

    await collections.comments.updateOne({ _id: commentId }, { $set: { text } })

    const [comment] = await collections.comments.aggregate([
      {
        $match: { _id: commentId }
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
        $limit: 1
      },
      {
        $unset: ['creators', 'creatorId', 'creator.password', 'creator.followings']
      }
    ]).toArray()

    return res.status(200).json({ comment })
  } catch (e) {
    return next(e)
  }
}

module.exports = updateCommentController

