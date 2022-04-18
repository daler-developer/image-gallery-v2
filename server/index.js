require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const client = require('./db/client')
const usersRouter = require('./routers/usersRouter')
const postsRouter = require('./routers/postsRouter')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
  return res.json({ name: 'this is daler' })
})

app.use('/api', usersRouter)
app.use('/api', postsRouter)

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')))

const start = async () => {
  try {
    await client.connect()
  
    app.listen(process.env.PORT || 4000, () => console.log('listening'))
  } catch (e) {
    console.log('db error')
  }
}

start()
