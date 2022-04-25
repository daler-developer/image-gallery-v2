const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')

const removeLikeController = async (req, res) => {
  try {
    const params = req.params
    const currentUser = req.user

    if (!await collections.posts.findOne({ _id: new ObjectId(params._id) }) ) {
      return res.status(404).json({ errorType: errorTypes.POSTS_NOT_FOUND })
    }
 
    // check if user did not ye liked post
    if (!await collections.posts.findOne({ _id: new ObjectId(params._id), likes: { $all: [currentUser._id] } })) {
      return res.status(500).json({ errorType: errorTypes.POSTS_DID_NOT_LIKE_YET })
    }

    await collections.posts.updateOne({ _id: new ObjectId(params._id) }, { $pull: {
      likes: currentUser._id
    }})

    return res.status(200).json({ })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = removeLikeController

