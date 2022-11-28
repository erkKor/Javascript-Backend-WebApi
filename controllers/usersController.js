const express = require('express')
const controller = express.Router()
let products = require('../data/simulated_database')

controller.param("articleNumber", (req, res, next, articleNumber) => {
    req.product = products.find(product => product.articleNumber == articleNumber)
    next()
})


// POST - CREATE - Skapa en användare - http://localhost:5000/api/products
//http://localhost:5000/api/products
controller.route('/')
.post((httpRequest, httpResponse) => {
    let product = {
        articleNumber: (products[products.length -1])?.articleNumber > 0 ? (products[products.length -1])?.articleNumber + 1 : 1,
        name: httpRequest.body.name,
        category: httpRequest.body.category,
        price: httpRequest.body.price,
        rating: httpRequest.body.rating,
        imageName: httpRequest.body.imageName
    }

    products.push(product)
    httpResponse.status(201).json(product)
})
.get((httpRequest, httpResponse) => {
    httpResponse.status(200).json(products)
})



// GET - READ - Hämta alla användare - http://localhost:5000/api/products
// GET - READ - Hämta EN användare - http://localhost:5000/api/products/1

controller.route("/:articleNumber")
.get((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined)
        httpResponse.status(200).json(httpRequest.product)
    else
        httpResponse.status(404).json()
})

.put((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined){
        products.forEach(product => {
            if (product.articleNumber == httpRequest.product.articleNumber) {
                product.name = httpRequest.body.name ? httpRequest.body.name : product.name
                product.category = httpRequest.body.category ? httpRequest.body.category : product.category
                product.price = httpRequest.body.price ? httpRequest.body.price : product.price
                product.rating = httpRequest.body.rating ? httpRequest.body.rating : product.rating
                product.imageName = httpRequest.body.imageName ? httpRequest.body.imageName : product.imageName
            }
        })
        httpResponse.status(200).json(httpRequest.product)
    }
        
    else
        httpResponse.status(404).json()
})

.delete((httpRequest, httpResponse) => {
    if (httpRequest.product != undefined){
        products = products.filter(product => product.articleNumber !== httpRequest.product.articleNumber)
        httpResponse.status(204).json()
    }
    else
        httpResponse.status(404).json({ message: 'not found'})
})




module.exports = controller