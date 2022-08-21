const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
  console.log('DB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Cannot connect to DB! Error ${err}`)
  process.exit(1)
})

exports.connect = async (mongoURL = '127.0.0.1:27017/db') => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return mongoose.connection
}