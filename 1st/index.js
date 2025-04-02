const express = require('express')
const dotenv = require('dotenv').config()
const connectToDB = require('./db/connect')
const numbersRoute = require('./routes/route')

// Connect to MongoDB
connectToDB()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/', numbersRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

