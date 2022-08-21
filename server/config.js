require('dotenv').config()

const options = {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URL
}

module.exports = options