
const handleErrorMiddleware = (err, req, res, next) => {
  console.log(err)
  return res.status(err.status || 500).json({ errorType: err.type })
}

module.exports = handleErrorMiddleware
