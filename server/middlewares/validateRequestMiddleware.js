const { validationResult } = require('express-validator')
const errorTypes = require('../utils/errorTypes')
const RequestError = require('../utils/RequestError')

const validateRequestMiddleware = (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      throw new RequestError(500, errorTypes.COMMON_VALIDATION_ERROR)
    }
    return next()
  } catch (e) {
    return next(e)
  }
}

module.exports = validateRequestMiddleware
