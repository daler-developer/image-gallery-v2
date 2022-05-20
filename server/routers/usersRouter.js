const express = require('express')
const validator = require('express-validator')

const getUsersController= require('../controllers/users/getUsersController')
const getUserController = require('../controllers/users/getUserController')
const registerController = require('../controllers/users/registerController')
const loginController = require('../controllers/users/loginController')
const updateProfileController = require('../controllers/users/updateProfileController')
const getCurrentUserController = require('../controllers/users/getCurrentUserController')
const followUserController = require('../controllers/users/followUserController')
const unfollowUserController = require('../controllers/users/unfollowUserController')
const getUserFollowersController = require("../controllers/users/getUserFollowersController")
const getUserFollowingsController = require("../controllers/users/getUserFollowingsController")

const populateUserMiddleware = require('../middlewares/populateUserMiddleware')
const { avatarsUpload } = require('../utils/uploads')
const validateRequestMiddleware = require('../middlewares/validateRequestMiddleware')

const router = new express.Router()

router.get(
  '/users',
  validator.query('offset')
    .optional()
    .toInt(),
  validator.query('postLikedId')
    .optional()
    .trim(),
  validateRequestMiddleware,
  populateUserMiddleware, 
  getUsersController
)

router.post(
  '/users/register',
  validator.body('username')
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validator.body('password')
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validateRequestMiddleware,
  registerController
)

router.post(
  '/users/login',
  validator.body('username')
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validator.body('password')
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validateRequestMiddleware,
  loginController
)

router.get(
  '/users/current',
  populateUserMiddleware,
  validateRequestMiddleware,
  getCurrentUserController
)

router.patch(
  '/users/:_id',
  populateUserMiddleware,
  avatarsUpload.single('avatar'),
  validator.body('username')
    .optional()
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validator.body('password')
    .optional()
    .isLength({ min: 3, max: 15 })
    .toLowerCase(),
  validateRequestMiddleware,
  updateProfileController
)

router.get(
  '/users/:_id/followers',
  populateUserMiddleware,
  validator.query('offset')
    .optional()
    .toInt(),
  validateRequestMiddleware,
  getUserFollowersController
)

router.get(
  '/users/:_id/followings',
  populateUserMiddleware,
  validator.query('offset')
    .optional()
    .toInt(),
  validateRequestMiddleware,
  getUserFollowingsController
)

router.patch(
  '/users/:_id/follow',
  populateUserMiddleware,
  validateRequestMiddleware,
  followUserController
)

router.patch(
  '/users/:_id/unfollow',
  populateUserMiddleware,
  validateRequestMiddleware,
  unfollowUserController
)

router.get(
  '/users/:_id',
  populateUserMiddleware,
  getUserController
)

module.exports = router
