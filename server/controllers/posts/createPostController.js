const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')
const { generatePostImageFileUrl } = require('../../utils/helpers')
const RequestError = require('../../utils/RequestError')

const createPostController = async (req, res, next) => {
  try {
    const file = req.file
    const currentUser = req.user
    const { text } = req.body

    if (!file) {
      throw new RequestError(400, errorTypes.COMMON_VALIDATION_ERROR)
    }

    const { insertedId } = await collections.posts.insertOne({
      imageUrl: generatePostImageFileUrl(file.filename),
      text,
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
        $unset: ['likes', 'comments', 'creatorId', 'creators', 'creator.password']
      }
    ]).toArray()

    return res.status(200).json({ post: postCreated })
  } catch (e) {
    return next(e)
  }
}

module.exports = createPostController
