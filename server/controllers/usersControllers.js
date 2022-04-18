const jwt = require('jsonwebtoken')
const collections = require('../db/collections')
const errorTypes = require('../utils/errorTypes')
const { ObjectId } = require('mongodb')
const { generateAvatarFileUrl, generateAuthToken, decodeAuthToken } = require('../utils/helpers')

const getAll = async (req, res) => {
  try {
    const currentUser = req.user
    const { excludeCurrentUser, limit = 10, offset = 0 } = req.query

    const selector = {}

    if (excludeCurrentUser) {
      selector._id = {
        $ne: currentUser._id
      }
    }

    const users = await collections.users.find(selector).limit(limit).skip(offset).toArray()

    return res.status(200).json({ users })
  } catch (e) {
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const candidate = await collections.users.findOne({ username })

    if (candidate) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const { insertedId } = await collections.users.insertOne({
      username, password
    })

    const user = await collections.users.findOne({ _id: insertedId }, { projection: { password: 0 } })
    const token = jwt.sign({ userId: insertedId.toString() }, process.env.JWT_SECRET, { expiresIn: '2 days' })

    return res.status(202).json({ user, token })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await collections.users.findOne({ username })

    if (!user) {
      return res.status(404).json({ errorType: errorTypes.USERS_USER_DOES_NOT_EXIST })
    }

    if (user.password !== password) {
      return res.status(404).json({ errorType: errorTypes.AUTH_INVALID_PASSWORD })
    }

    const token = generateAuthToken(user._id.toString())

    return res.status(200).json({ user, token })
  } catch (e) {
    return res.status(500).json({ errorType: errorTypes.COMMON_SERVER_ERROR })
  }
}

const getCurrent = async (req, res) => {
  try {
    const { _id } = req.user

    const user = await collections.users.findOne({ _id })

    return res.status(200).json({ user })
  } catch (e) {
    return res.status(500).json({ type: errorTypes.COMMON_SERVER_ERROR })
  }
}

const updateProfile = async (req, res) => {
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

module.exports = {
  register,
  login,
  updateProfile,
  getAll,
  getCurrent
}
