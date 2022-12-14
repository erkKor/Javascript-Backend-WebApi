const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const controller = express.Router()

const {generateAccesToken} = require('../middlewares/authorization')
const userSchema = require('../schemas/userSchema')

//unsecured rou
controller.route('/signup').post(async(req,res) => {
    const {firstName, lastName, email, password} = req.body

    if (!firstName || !lastName || !email || !password)
        res.status(400).json({text: 'something very wong'})

    const exists = await userSchema.findOne({email})
    if(exists)
        res.status(409).json({text: 'email already exists'})
    else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const user = await userSchema.create({
            firstName,
            lastName,
            email,
            password : hashedPassword
        })

        if (user)
            res.status(201).json({text: 'user created'})
        else 
            res.status(400).json({text: 'something wong again'})

    }
})


controller.route('/signin').post(async(req,res) => {
    const {email, password} = req.body

    if (!email || !password)
        res.status(400).json({text: 'email and password required'})

    const user = await userSchema.findOne({email})
    if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            accesToken: generateAccesToken(user._id),
            name : user.firstName
        })
    } else{
        res.status(400).json({text: 'wrong email or password'})
    }
        
})



module.exports = controller