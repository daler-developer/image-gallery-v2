const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')

const deletePostController = async (req, res) => {
  try {
   const currentUser = req.user
   const params = req.params

    const post = await collections.posts.findOne({ _id: new ObjectId(params._id) })

    if (!post) {
      return res.status(404).json({ errorType: errorTypes.POSTS_NOT_FOUND })
    }

    if (!post.creatorId.equals(currentUser._id)) {
      return res.status(400).json({ errorType: errorTypes.POSTS_FORBIDDEN_TO_DELETE })
    }

    await collections.posts.deleteOne({ _id: new ObjectId(params._id) })

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = deletePostController

