const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    category: {type: String, required: true},
    tag: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: true},
    imageName: {type: String}
})

module.exports = mongoose.model("products", productSchema)