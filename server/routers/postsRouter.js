const express = require('express')
const validator = require('express-validator')
const postsControllers = require('../controllers/postsControllers')
const validateRequestMiddleware = require('../middlewares/validateRequestMiddleware')
const populateUserMiddleware = require('../middlewares/populateUserMiddleware')

const router = new express.Router()

router.get(
  '/posts',
  populateUserMiddleware,
  validator.query('offset')
    .optional()
    .toInt(),
  validator.query('limit')
    .optional()
    .toInt(),
  validator.query('userId')
    .optional(),
  validateRequestMiddleware,
  postsControllers.getPosts
)

module.exports = router
