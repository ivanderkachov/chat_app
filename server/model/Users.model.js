const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: Boolean,
    required: true,
    default: false
  }
},
{ timestamps: true })

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password)
  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ name, email, password, isReg }) {
    if (!name) {
      throw new Error("No Name");
    }
    if (!email) {
      throw new Error("No Email")
    }
    if (!password) {
      throw new Error("No password")
    }
    if (isReg === false) {
      const user = await this.findOne({ email, name }).exec()
      if (!user) {
        throw new Error("No such user")
      }
      const isPasswordOk = await user.passwordMatches(password)
      if (!isPasswordOk) {
        throw new Error("Password incorrect")
      }
      // await user.updateOne({ isLogin: true })
      return user
    } else {
      const user = await this.findOne({ email }).exec()
      const userName = await this.findOne({ name }).exec()
      if (user || userName) {
        throw new Error("User is already exists")
      }
      try {
        const userObj = await new this({ name, email, password })
        await userObj.save()
        return userObj
      } catch (err) {
        console.log(err)
      }
    }
  },
};

module.exports = mongoose.model('chat_users', userSchema)