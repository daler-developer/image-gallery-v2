const { ObjectId } = require('mongodb')
const collections = require('../../../db/collections')
const errorTypes = require('../../../utils/errorTypes')
const RequestError = require('../../../utils/RequestError')

const deleteCommentController = async (req, res, next) => {
  try {
    const commentId = new ObjectId(req.params.commentId)
    const postId = new ObjectId(req.params.postId)
    const currentUser = req.user

    if (!await collections.comments.findOne({ creatorId: currentUser._id })) {
      throw new RequestError(400, errorTypes.COMMENTS_FORBIDDEN_TO_DELETE_COMMENT)
    }

    await collections.comments.deleteOne({ _id: commentId })
    await collections.posts.updateOne({ _id: postId }, {
      $pull: {
        comments: commentId
      }
    })

    return res.status(200).end()
  } catch (e) {
    return next(e)
  }
}

module.exports = deleteCommentController
