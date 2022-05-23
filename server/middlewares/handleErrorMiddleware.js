const RequestError = require('../utils/RequestError')
const errorTypes = require('../utils/errorTypes')

const handleErrorMiddleware = (err, req, res, next) => {
  if (err instanceof RequestError) {
    return res.status(err.status).json({ errorType: err.type })
  }

  return res.status(500).json({ errorType: errorTypes.COMMON_SERVER_ERROR })
}

module.exports = handleErrorMiddleware
