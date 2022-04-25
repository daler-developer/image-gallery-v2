const express = require('express')
const validator = require('express-validator')

const validateRequestMiddleware = require('../middlewares/validateRequestMiddleware')
const populateUserMiddleware = require('../middlewares/populateUserMiddleware')

const getPostsController = require('../controllers/posts/getPostsController')
const createPostController = require('../controllers/posts/createPostController')
const likePostController = require('../controllers/posts/likePostController')
const removeLikeController = require('../controllers/posts/removeLikeController')
const deletePostController = require('../controllers/posts/deletePostController')

const getCommentsController = require('../controllers/posts/comments/getCommentsController')
const createCommentController = require('../controllers/posts/comments/createCommentController')
const deleteCommentController = require('../controllers/posts/comments/deleteCommentController')

const { postsImagesUpload } = require('../utils/uploads')

const router = new express.Router()

router.get(
  '/posts',
  populateUserMiddleware,
  validator.query('offset')
    .optional()
    .toInt(),
  validateRequestMiddleware,
  getPostsController
)

router.post(
  '/posts',
  populateUserMiddleware,
  postsImagesUpload.single('image'),
  createPostController
)

router.patch(
  '/posts/:_id/like',
  populateUserMiddleware,
  likePostController
)

router.patch(
  '/posts/:_id/remove-like',
  populateUserMiddleware,
  removeLikeController
)

router.delete(
  '/posts/:_id',
  populateUserMiddleware,
  deletePostController
)

router.get(
  '/posts/:postId/comments',
  populateUserMiddleware,
  getCommentsController
)

router.post(
  '/posts/:postId/comments',
  populateUserMiddleware,
  validator.body('text')
    .trim()
    .notEmpty(),
  createCommentController
)

router.delete(
  '/posts/:postId',
  populateUserMiddleware,
  deleteCommentController
)

module.exports = router
