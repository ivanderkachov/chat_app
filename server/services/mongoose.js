const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
  console.log('DB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Cannot connect to DB! Error ${err}`)
  process.exit(1)
})

exports.connect = async (mongoURL = 'mongodb+srv://vercel-admin-user-63029d53e7cfd9142daa7a36:5fKWpm9WDEQ3kiUa@cluster0.uwzfx.mongodb.net/admin') => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return mongoose.connection
}