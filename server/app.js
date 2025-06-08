require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require('./config/connectDB')
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT
const app = express()

connectDB()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(cookieParser())
app.use("/users", require("./routes/userRoutes"))

mongoose.connection.on("open", () => {
    console.log('connected to db!')
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
})