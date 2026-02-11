const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://username:password@cluster0.50r0ysh.mongodb.net/ecommerce")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err))

const process = require('process')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})