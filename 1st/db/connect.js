const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

const connectToDB = async () => {
    try {
        console.log(uri)
        const connect = await mongoose.connect(uri)
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    }
}

module.exports = connectToDB