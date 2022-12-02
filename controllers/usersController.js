const express = require('express')
const controller = express.Router()
let users = require('../data/simulated_database_user')

controller.param("userID", (req, res, next, userID) => {
    req.users = users.find(user => user.userID == userID)
    next()
})


// POST - CREATE - Skapa en användare - http://localhost:5000/api/products
//http://localhost:5000/api/products
controller.route('/')
.post((httpRequest, httpResponse) => {


    let user = {
        userID: (users[users.length -1])?.userID > 0 ? (users[users.length -1])?.userID + 1 : 1,
        firstName: httpRequest.body.firstName,
        lastName: httpRequest.body.lastName,
        email: httpRequest.body.email,
        password: httpRequest.body.password,
    }

    users.push(user)
    httpResponse.status(201).json(user)
})
.get((httpRequest, httpResponse) => {
    httpResponse.status(200).json(users)
})



// GET - READ - Hämta alla användare - http://localhost:5000/api/products
// GET - READ - Hämta EN användare - http://localhost:5000/api/products/1

controller.route("/:userID")
.get((httpRequest, httpResponse) => {
    if (httpRequest.user != undefined)
        httpResponse.status(200).json(httpRequest.user)
    else
        httpResponse.status(404).json()
})

.put((httpRequest, httpResponse) => {
    if (httpRequest.user != undefined){
        users.forEach(user => {
            if (user.userID == httpRequest.user.userID) {
                user.firstName = httpRequest.body.firstName ? httpRequest.body.firstName : user.firstName
                user.lastName = httpRequest.body.lastName ? httpRequest.body.lastName : user.lastName
                user.email = httpRequest.body.email ? httpRequest.body.email : user.email
                user.password = httpRequest.body.password ? httpRequest.body.password : user.password
            }
        })
        httpResponse.status(200).json(httpRequest.user)
    }
        
    else
        httpResponse.status(404).json()
})

.delete((httpRequest, httpResponse) => {
    if (httpRequest.user != undefined){
        users = users.filter(user => user.userID !== httpRequest.user.userID)
        httpResponse.status(204).json()
    }
    else
        httpResponse.status(404).json({ message: 'not found'})
})




module.exports = controller