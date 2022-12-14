require('dotenv').config()
const port = process.env.API_PORT
const initMongoDB = require('./mongodb-server')
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/api/products', require('./controllers/productsController'))
app.use('/api/authentication', require('./controllers/authenticationController'))

app.use('/graphql', graphqlHTTP ({
    schema: require('./schemas/graphQL/graphqlSchema'),
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Api is running at http${port}`)
    initMongoDB()
})