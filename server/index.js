const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development'

require('dotenv').config({ path: path.join(__dirname, NODE_ENV === 'development' ? '.env.local' : '.env') })

const express = require('express')
const cors = require('cors')
const client = require('./db/client')
const usersRouter = require('./routers/usersRouter')
const postsRouter = require('./routers/postsRouter')
const handleErrorMiddleware = require('./middlewares/handleErrorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', usersRouter)
app.use('/api', postsRouter)

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(handleErrorMiddleware)

const start = async () => {
  try {
    await client.connect()
  
    app.listen(4000, () => console.log('listening on post 4000'))
  } catch (e) {
    console.log('db error', e)
  }
}

start()
