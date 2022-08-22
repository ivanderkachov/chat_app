
const express = require('express')
const http = require('http')
const cors = require('cors')
const axios = require('axios')
const path = require('path')
require("dotenv").config({ path: ".env" });
const mongooseService = require('./services/mongoose')
const Users = require('./model/Users.model')
const Conversations = require('./model/Conversation.model')
const app = express();
const server = http.createServer(app)
const router = express.Router()


const port = process.env.PORT;


mongooseService.connect(process.env.MONGODB_URI)


// app.use(express.static("../public"));
app.use(cors());
app.use(router)
app.use(express.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("Api running")
  })
}

console.log(process.env.NODE_ENV)
// app.get("/", (req, res) => {
//   res.sendFile("index.html", { root: path.join(__dirname, "../public") });
// });

// router.get("/", (req, res) => {
//   res.json("Server up and running");
// });

app.get("/api/v1/info", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/v1/join", async (req, res) => {
  const { isReg } = req.body
  if (isReg) {
    try {
      const user = await Users.findAndValidateUser(req.body);
      // res.cookie("userData", JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 48 });
      res.status(200).json({ status: "User is added", user });
    } catch (err) {
      console.log(err);
      res.status(300).json({ status: `Incorrect registration data ${err}` });
    }
  } else {
    try {
      const user = await Users.findAndValidateUser(req.body);
      // res.cookie("userData", JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 48 });
      res.status(200).json({ status: "User is login", user });
    } catch (err) {
      console.log(err);
      res.status(300).json({ status: `Incorrect login data ${err}` });
    }
  }

})

app.get("/api/v1/users", async (req, res) => {
  try {
    const users = await Users.find({}).exec()
    res.json({status: 'ok', users})
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/conversations/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    const conversations = await Conversations.find({members: { $in: [userId]}}).sort({ updatedAt: 'desc' }).exec()
    res.json({status: 'ok', conversations})
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/v1/conversations/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params
  try {
    const conversationExist = await Conversations.find({members: { $all: [userId, friendId]}}).exec()
    if (conversationExist.length !== 0) {
      const conversations = await Conversations.find({members: { $in: [userId]}}).sort({ updatedAt: 'desc' }).exec()
      res.json({status: 'ok', conversations})
    }
    else {
      const newConversation = await new Conversations({
        members: [userId, friendId],
        messages:[]
      })
      await newConversation.save()
      const conversations = await Conversations.find({members: { $in: [userId]}}).sort({ updatedAt: 'desc' }).exec()
      res.json({status: 'New conversation added', conversations})
    }
  } catch (err) {
    console.log(err)
  }
})

app.post("/api/v1/messages/:conversationId", async (req, res) => {
  const { conversationId } = req.params
  const message = req.body
  try {
    await Conversations.findOneAndUpdate({ _id: conversationId}, { $push: { messages: message }})
    const conversations = await Conversations.find({members: { $in: [message.sender]}}).sort({ updatedAt: 'desc' }).exec()
    res.json({status: 'ok', conversations})
  } catch (err) {
    console.log(err)
  }
})

app.post("/api/v1/messages/cn/:conversationId/:userId", async (req, res) => {
  const { conversationId, userId } = req.params
  const message = req.body
  const response = await axios("https://api.chucknorris.io/jokes/random")
    .then(({ data }) => {
      return data.value
    })
  const newMessage = { ...message, text: response}
    try {
    await Conversations.findOneAndUpdate({ _id: conversationId}, { $push: { messages: newMessage }})
    const conversations = await Conversations.find({members: { $in: [userId]}}).sort({ updatedAt: 'desc' }).exec()
    res.json({status: 'ok', conversations})
  } catch (err) {
    console.log(err)
  }
})

server.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})

module.exports = app;