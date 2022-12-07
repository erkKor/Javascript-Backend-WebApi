const jwt = require('jsonwebtoken')

const generateAccesToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


const authorize = (req, res, next) => {
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            const accesToken = req.headers.authorization.split(' ')[1]
            const decodedAccesToken = jwt.verify(accesToken, process.env.JWT_SECRET)
            next()
        } catch {
            res.status(401).json()
        }
    } else{
        res.status(401).json()
    }

}

module.exports = {generateAccesToken, authorize}