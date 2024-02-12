const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');

const api = express();

api.use(cors());
api.use(express.json());

api.use("/users", userRouter);

api.get("/", (req, res) => {
    res.json({
        name: "Florin Connect",
        description: "A hub for all things Florin."
    })
})


module.exports = api;