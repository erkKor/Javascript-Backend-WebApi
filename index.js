require('dotenv').config()
const port = process.env.API_PORT
const initMongoDB = require('./mongodb_server')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

//middleware
app.use(cors())
// app.use(bodyParser.json())       samma sak som under?
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
// const productsController = require('./controllers/productsController')
// const usersController = require('./controllers/usersController')
app.use('/api/products', require('./controllers/productsController'))
app.use('/api/authentication', require('./controllers/authenticationController'))


initMongoDB()
app.listen(port, () => console.log(`WebbApi is running on http://localhost:${port}`))