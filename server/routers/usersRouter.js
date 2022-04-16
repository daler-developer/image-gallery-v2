const express = require('express')
const usersController = require('../controllers/usersControllers')
const populateUserMiddleware = require('../middlewares/populateUserMiddleware')
const validator = require('express-validator')
const { avatarsUpload } = require('../utils/uploads')
const validateRequestMiddleware = require('../middlewares/validateRequestMiddleware')

const router = new express.Router()

router.get(
  '/users',
  validator.query('limit')
    .optional()
    .toInt(),
  validator.query('offset')
    .optional()
    .toInt(),
  validator.query('excludeCurrentUser')
    .custom((value) => (value && value !== 'yes' && value !== 'no') ? Promise.reject() : Promise.resolve)
    .customSanitizer((value) => value === 'yes' ? true : false),
  validateRequestMiddleware,
  populateUserMiddleware, 
  usersController.getAll
)

router.post(
  '/users/register',
  validator.body('username')
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validator.body('passsword')
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validateRequestMiddleware,
  usersController.register
)

router.post(
  '/users/login',
  validator.body('username')
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validator.body('passsword')
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validateRequestMiddleware,
  usersController.login
)

router.post(
  '/users/verify-token',
  validator.body('token')
    .isJWT(),
  validateRequestMiddleware,
  usersController.verifyToken
)

router.patch(
  '/users/:_id',
  populateUserMiddleware,
  avatarsUpload.single('avatar'),
  validator.body('username')
    .optional()
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validator.body('passsword')
    .optional()
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validateRequestMiddleware,
  usersController.updateProfile
)

module.exports = router
