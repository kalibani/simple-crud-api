const jwt = require('jsonwebtoken')

function middleWare (req,res,next){
    // const {headers: {token}} = req
    const token = req.headers.authorization.split(' ')[1]
    try {
        var decoded = jwt.verify(token, 'SECRET');
        next()
    } catch (error) {
        res.status(400).json({code: 400, message: 'Bad Token'})
    }
}

module.exports = middleWare