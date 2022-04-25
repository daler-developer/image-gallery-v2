const { ObjectId } = require('mongodb')
const collections = require('../../../db/collections')
const errorTypes = require('../../../utils/errorTypes')

const getCommentsController = async (req, res) => {
  try {
    const params = req.params
    const postId = new ObjectId(params.postId)

    const post = await collections.posts.findOne({ _id: postId })

    if (!post) {
      return res.status(404).json({ errorType: errorTypes.POSTS_NOT_FOUND })
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
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = getCommentsController

