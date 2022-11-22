const port = process.env.PORT || 5000
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()


//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

const usersController = require('./controllers/usersController')
app.use('/api/products', usersController)



app.listen(port, () => console.log(`WebbApi is running on http://localhost:${port}`))