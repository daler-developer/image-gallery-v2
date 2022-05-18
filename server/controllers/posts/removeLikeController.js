const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const removeLikeController = async (req, res, next) => {
  try {
    const currentUser = req.user
    const postId = new ObjectId(req.params._id)

    if (!await collections.posts.findOne({ _id: postId }) ) {
      throw new RequestError(404, errorTypes.POSTS_POST_NOT_FOUND)
    }
 
    // check if user did not ye liked post
    if (!await collections.posts.findOne({ _id: postId, likes: { $all: [currentUser._id] } })) {
      throw new RequestError(400, errorTypes.POSTS_DID_NOT_LIKE_POST_YET)
    }

    await collections.posts.updateOne({ _id: postId }, { $pull: {
      likes: currentUser._id
    }})

    return res.status(200).end()
  } catch (e) {
    return next(e)
  }
}

module.exports = removeLikeController

