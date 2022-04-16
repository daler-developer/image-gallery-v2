const errorTypes = require('../utils/errorTypes')

const getPosts = (req, res) => {
  try {
    
  } catch (e) {
    return res.status(500).json({ errorType: errorTypes.COMMON_SERVER_ERROR })
  }
}

module.exports = {
  getPosts
}
