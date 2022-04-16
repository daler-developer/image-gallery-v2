const path = require('path')
const multer = require('multer')
const fs = require('fs')

const avatarsUpload = multer({ storage: {
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', 'uploads', 'avatars')

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    cb(null, path.join(__dirname, '..', 'uploads', 'avatars'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
}})

module.exports = { avatarsUpload }
