const client = require("./client")

const db = client.db(process.MONGO_DBNAME)

module.exports = db
