const { ObjectId } = require("mongodb")
const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')
const { generateAvatarFileUrl } = require("../../utils/helpers")
const RequestError = require('../../utils/RequestError')

const updateProfileController = async (req, res, next) => {
  try {
    const currentUser = req.user
    const userId = new ObjectId(req.params._id)
    const { username, password, removeAvatar } = req.body
    const avatarFile = req.file

    if (!currentUser._id.equals(userId)) {
      throw new RequestError(400, errorTypes.AUTH_PERMISSION_DENIED)
    }

    const updatedFields = {}

    if (username) {
      const userWithSameUsername = await collections.users.findOne({ username })

      if (userWithSameUsername && !userWithSameUsername._id.equals(userId)) {
        throw new RequestError(400, errorTypes.USERS_USER_WITH_SAME_USERNAME_EXISTS)
      }

      updatedFields.username = username
    }

    if (password) {
      updatedFields.password = password
    } 

    if (removeAvatar) {
      await collections.users.updateOne({ _id: userId }, { $unset: { avatarUrl: '' } })
    } else if (avatarFile) {
      updatedFields.avatarUrl = generateAvatarFileUrl(avatarFile.filename)
    }

    await collections.users.updateOne({ _id: userId }, { $set: updatedFields })

    const [user] = await collections.users.aggregate([
      {
        $match: {
          _id: userId
        }
      },
      {
        $unset: ['followings', 'password']
      }
    ]).toArray()
 
    return res.json({ user })
  } catch (e) {
    return next(e)
  }
}

module.exports = updateProfileController
