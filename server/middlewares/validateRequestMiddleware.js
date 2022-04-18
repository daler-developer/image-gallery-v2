const { validationResult } = require('express-validator')
const errorTypes = require('../utils/errorTypes')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(500).json({ errorType: errorTypes.COMMON_VALIDATION_ERROR  })
  }

  return next()
}
