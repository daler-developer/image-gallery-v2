const express = require('express')
const validator = require('express-validator')

const validateRequestMiddleware = require('../middlewares/validateRequestMiddleware')
const populateUserMiddleware = require('../middlewares/populateUserMiddleware')

const getPostsController = require('../controllers/posts/getPostsController')
const searchPostsController = require('../controllers/posts/searchPostsController')
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
  validator.query('creatorId')
    .optional()
    .trim(),
  validateRequestMiddleware,
  getPostsController
)

router.get(
  '/posts/search',
  populateUserMiddleware,
  validator.query('query')
    .trim()
    .isLength({ min: 1, max: 100 }),
  validator.query('offset')
    .optional()
    .toInt(),
  validateRequestMiddleware,
  searchPostsController
)

router.post(
  '/posts',
  populateUserMiddleware,
  postsImagesUpload.single('image'),
  validator.body('text')
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 100 }),
  validateRequestMiddleware,
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
  validator.query('offset')
    .trim()
    .toInt(),
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
  '/posts/:postId/comments/:commentId',
  populateUserMiddleware,
  deleteCommentController
)

module.exports = router
