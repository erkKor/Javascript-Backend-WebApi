const express = require('express')
const { authorize } = require('../middlewares/authorization')
const productSchema = require('../schemas/productSchema')
const controller = express.Router()


// SECURED
controller.route('/').post(authorize, async (req, res) => {
    const {name, category, tag, price, rating, imageName} = req.body
    if (!name || !tag || !category || !price || !rating)
        res.status(400).json({text: 'Fields cannot be empty'})
    
    const item_exists = await productSchema.findOne({name})
    if (item_exists)
        res.status(409).json({text: 'Product already exists with that name'})
    else{
        const product = await productSchema.create({
            name,
            category,
            tag,
            price,
            rating,
            imageName
        })
        const productNEW = await productSchema.findById(product._id)
        if (productNEW){
            res.status(201).json({
                articleNumber: product._id,
                name: product.name,
                category: product.category,
                tag: product.tag,
                price: product.price,       
                rating: product.rating,
                imageName: product.imageName
            })
            }
        else
            res.status(400).json({text: 'something wong'})
    }
})


.get(async (req, res) => {
    const ReactProducts = []
    const DBproducts = await productSchema.find()
    if(DBproducts) {
        for(let product of DBproducts) {
            ReactProducts.push({
                articleNumber: product._id,
                name: product.name,
                category: product.category,
                tag: product.tag,
                price: product.price,       
                rating: product.rating,
                imageName: product.imageName
            })
        }
        res.status(200).json(ReactProducts)
    } 
    else
        res.status(404).json()
})

controller.route("/details/:articleNumber")
.get(async(req, res) => {
    const product = await productSchema.findById(req.params.articleNumber)
    if(product){
        res.status(200).json({
            articleNumber: product._id,
            name: product.name,
            category: product.category,
            tag: product.tag,
            price: product.price,       
            rating: product.rating,
            imageName: product.imageName
        })
    }
    else
        res.status(404).json()
})

.put(async (req, res) => { 
    const product = {
        name: req.body.name,
        category: req.body.category,
        tag: req.body.tag,
        price: req.body.price,
        rating: req.body.rating,
        imageName: req.body.imageName
    }
    if (req.params.articleNumber != undefined){
        await productSchema.findByIdAndUpdate(req.params.articleNumber, product)
        res.status(200).json(product)
    }
    else
        res.status(404).json()
})
// .put((req, res) => { 
//     if (req.product != undefined){
        
//         products.forEach(product => {
//             if (product.articleNumber == req.product.articleNumber) {
//                 product.name = req.body.name ? req.body.name : product.name
//                 product.category = req.body.category ? req.body.category : product.category
//                 product.price = req.body.price ? req.body.price : product.price
//                 product.rating = req.body.rating ? req.body.rating : product.rating
//                 product.imageName = req.body.imageName ? req.body.imageName : product.imageName
//             }
//         })
//         res.status(200).json(req.product)
//     }
        
//     else
//         res.status(404).json()
// })

// SECURED
// .delete(authorize, async(req,res) => {
.delete(authorize, async(req,res) => {
    if (!req.params.articleNumber)
        res.status(400).json('no work')
    else{
        const item = await productSchema.findById(req.params.articleNumber)
        if(item){
            await productSchema.deleteOne(item)
            res.status(200).json(productSchema)
        }else{
            res.status(404).json({text: 'delete fialed'})
        }
    }
})

controller.route('/:tag')
.get(async (req, res) => {
    const ReactProducts = []
    const DBproducts = await productSchema.find({tag: req.params.tag})
    if(DBproducts) {
        for(let product of DBproducts) {
            DBproducts.push({
                articleNumber: product._id,
                name: product.name,
                category: product.category,
                tag: product.tag,
                price: product.price,       
                rating: product.rating,
                imageName: product.imageName
            })
        }
        res.status(200).json(ReactProducts)
    }
        
    else
        res.status(404).json()
})


module.exports = controller







// console.log(product.name = req.body.name)
    // // console.log(req.body)
    // // console.log(product._id)
    
    // if (product){
    //     // product._id = product._id
    //     product.name = req.body.name
    //     product.category = req.body.category
    //     product.tag = req.body.tag
    //     product.price = req.body.price
    //     product.rating = req.body.rating
    //     product.imageName = req.body.imageName





    //     await productSchema.updateOne(product)

    //     // console.log(newProduct)
    //     res.status(200).json(product)
    //     console.log(product)
    // }