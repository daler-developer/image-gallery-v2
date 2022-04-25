const { ObjectId } = require('mongodb')
const collections = require('../../../db/collections')
const errorTypes = require('../../../utils/errorTypes')

const createCommentController = async (req, res) => {
  try {
    const { text } = req.body
    const postId = new ObjectId(req.params.postId)
    const creatorId = new ObjectId(req.user._id)

    const post = await collections.posts.findOne({ _id: postId })

    if (!post) {
      return res.status(404).json({ errorType: errorTypes.POSTS_NOT_FOUND })
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
          creator: { $first: '$creators' }
        }
      },
      {
        $unset: ['creators', 'creator.password', 'creator.followings']
      }
    ]).toArray()

    return res.status(200).json({ comment })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = createCommentController

