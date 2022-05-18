const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const deletePostController = async (req, res, next) => {
  try {
   const currentUser = req.user
   const postId = new ObjectId(params._id)

    const post = await collections.posts.findOne({ _id: postId })

    if (!post) {
      throw new RequestError(404, errorTypes.POSTS_POST_NOT_FOUND)
    }

    if (!post.creatorId.equals(currentUser._id)) {
      throw new RequestError(400, errorTypes.POSTS_FORBIDDEN_TO_DELETE_POST)
    }

    await collections.posts.deleteOne({ _id: postId })

    return res.status(200).json()
  } catch (e) {
    return next(e)
  }
}

module.exports = deletePostController

