const express = require('express')
const router = express.Router()

const numbers = require('../controllers/controller').numbers

router.get('/numbers/:id', numbers)

module.exports = router