const { ObjectId } = require("mongodb")
const collections = require("../../db/collections")
const errorTypes = require('../../utils/errorTypes')
const { generateAvatarFileUrl } = require("../../utils/helpers")

const updateProfileController = async (req, res) => {
  try {
    const currentUser = req.user
    const { _id } = req.params
    const { username, password, removeAvatar } = req.body
    const avatarFile = req.file

    if (currentUser._id.toString() !== _id) {
      return res.status(400).json({ type: errorTypes.AUTH_PERMISSION_DENIED })
    }

    const updatedFields = {}

    if (username) {
      const userWithSameUsername = await collections.users.findOne({ username })

      if (userWithSameUsername) {
        return res.status(500).json({ type: errorTypes.USERS_USER_WITH_SAME_USERNAME_EXISTS })
      }

      updatedFields.username = username
    }

    if (password) {
      updatedFields.password = password
    }

    if (removeAvatar) {
      await collections.users.updateOne({ _id: new ObjectId(_id) }, { $unset: { avatarUrl: '' } })
    } else if (avatarFile) {
      updatedFields.avatarUrl = generateAvatarFileUrl(avatarFile.filename)
    }

    await collections.users.updateOne({ _id: new ObjectId(_id) }, { $set: updatedFields })

    const user = await collections.users.findOne({ _id: new ObjectId(_id) })

    return res.json({ user })
  } catch (e) {
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = updateProfileController
