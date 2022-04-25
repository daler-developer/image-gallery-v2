const db = require('./db')

module.exports = {
  users: db.collection('users'),
  posts: db.collection('posts'),
  comments: db.collection('comments')
}
