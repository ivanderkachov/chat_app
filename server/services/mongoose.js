const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
  console.log('DB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Cannot connect to DB! Error ${err}`)
  process.exit(1)
})

exports.connect = async (mongoURL = "mongodb+srv://ivanderkachov:63441257I@cluster0.uwzfx.mongodb.net/DB_1") => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};