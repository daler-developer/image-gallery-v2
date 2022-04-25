const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const { generatePostImageFileUrl } = require('../../utils/helpers')

const createPostController = async (req, res) => {
  try {
    const file = req.file
    const currentUser = req.user

    if (!file) {
      return res.status(400).json({ errorType: errorTypes.COMMON_VALIDATION_ERROR })
    }

    const { insertedId } = await collections.posts.insertOne({
      imageUrl: generatePostImageFileUrl(file.filename),
      likes: [],
      comments: [],
      creatorId: currentUser._id
    })

    const [postCreated] = await collections.posts.aggregate([
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
          numLikes: { $size: '$likes' },
          numComments: { $size: '$comments' },
        }
      },
      {
        $unset: ['likes', 'comments', 'creators', 'creator.password']
      }
    ]).toArray()

    return res.status(200).json({ post: postCreated })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = createPostController
