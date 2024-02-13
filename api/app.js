const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const replyRouter = require('./routes/replyRoutes')
const logRoutes = require('./middleware/logger')

const api = express()

api.use(cors())
api.use(express.json())

api.use("/users", userRouter)
api.use("/posts", postRouter)
api.use("/replies", replyRouter)
api.use(logRoutes)

api.get("/", (req, res) => {
    res.json({
        name: "Florin Connect",
        description: "A hub for all things Florin."
    })
})


module.exports = api