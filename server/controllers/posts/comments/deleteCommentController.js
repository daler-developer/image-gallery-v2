const { ObjectId } = require('mongodb')
const collections = require('../../../db/collections')
const errorTypes = require('../../../utils/errorTypes')

const deleteCommentController = async (req, res, next) => {
  try {
    return res.status(200).json({ comments: foundComments })
  } catch (e) {
    return next(e)
  }
}

module.exports = deleteCommentController
