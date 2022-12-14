const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    firstName: {type: String, required: [true, 'please enter firstname']},
    lastName: {type: String, required:  [true, 'please enter lastname']},
    email: {type: String, required:  [true, 'please enter email'], unique: true},
    password: {type: String, required: [true, 'please enter password']},
})

module.exports = mongoose.model("users", userSchema)