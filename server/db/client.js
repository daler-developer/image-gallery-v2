const { MongoClient } = require('mongodb')

const client = new MongoClient(
  process.env.MONGO_URL,
  {
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
  }
)

module.exports = client
