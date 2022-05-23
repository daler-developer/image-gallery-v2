const client = require("./client")

const db = client.db(process.env.MONGO_DBNAME)

module.exports = db
