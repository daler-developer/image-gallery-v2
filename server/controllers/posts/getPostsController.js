const { ObjectId } = require('mongodb')
const collections = require('../../db/collections')
const errorTypes = require('../../utils/errorTypes')

const getPostsController = async (req, res) => {
  try {
    const creatorId = req.query.creatorId ? new ObjectId(req.query.creatorId) : null
    const currentUser = req.user
    const offset = req.query.offset || 0

    const pipelines = []

    // get posts created by specific user
    // if (creatorId) {
    //   pipelines.push({
    //     $match: {
    //       creatorId
    //     }
    //   })
    // } else {
    //   // otherwise posts from users current user follows to
    pipelines.push({
      $match: {
        $or: [
          { creatorId: { $in: currentUser.followings } },
          { creatorId: currentUser._id }
        ]
      }
    })

    pipelines.push({
      $lookup: {
        from: 'users',
        localField: 'creatorId',
        foreignField: '_id',
        as: 'creators'
      }
    })

    pipelines.push({
      $set: {
        creator: { $first: '$creators' },
        numLikes: { $size: '$likes' },
        numComments: { $size: '$comments' },
        likedByCurrentUser: { $in: [currentUser._id, '$likes'] }
      }
    })

    pipelines.push({
      $unset: ['likes', 'comments', 'creatorId', 'creators', 'creator.password', 'creator.followings']
    })

    
    pipelines.push({
      $skip: offset
    })
    
    pipelines.push({
      $limit: 2
    })

    const foundPosts = await collections.posts.aggregate(pipelines).toArray()

    return res.status(200).json({ posts: foundPosts })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = getPostsController
