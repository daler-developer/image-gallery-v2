const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const RequestError = require('../../utils/RequestError')

const likePostController = async (req, res, next) => {
  try {
    const postId = new ObjectId(req.params._id)
    const currentUser = req.user

    if (!await collections.posts.findOne({ _id: postId }) ) {
      throw new RequestError(404, errorTypes.POSTS_POST_NOT_FOUND)
    }
 
    // check if user already liked post
    if (await collections.posts.findOne({ _id: postId, likes: { $all: [currentUser._id] } })) {
      throw new RequestError(400, errorTypes.POSTS_ALREADY_LIKED_POST)
    }

    await collections.posts.updateOne({ _id: postId }, { $push: {
      likes: currentUser._id
    }})

    return res.status(200).end()
  } catch (e) {
    return next(e)
  }
}

module.exports = likePostController
