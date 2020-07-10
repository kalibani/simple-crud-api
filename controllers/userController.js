const {User} = require('../models')
var jwt = require('jsonwebtoken');
const {hash, compare} = require('../helpers/hashPassword')

class UserController {
    static signUp (req,res,next){
        const {password, username} = req.body
        if(password && username){
            User.findOne({
                where: {username: username}
            })
            .then((data) => {
                if(data === null){
                    return hash(password)
                } else {
                    res.status(200).json({message: 'username already taken'})
                }
            })
            .then((data) => {
                const payload = {
                    username: username,
                    password: data
                }
                return User.create(payload)
            })
            .then(() => {
                // const token  = jwt.sign({username}, process.env.SECRET)
                res.status(200).json({status: 'success'})
    
            })
            .catch(() => {
                next()
            })
        }else {
            res.status(200).json({message: 'Please fill username and password'})
        }
        
    }
    static signIn (req,res,next){
        const {password, username} = req.body
        if(password && username){
            User.findOne({
                where: {username: username}
            })
            .then((data) => {
                if(data === null){
                    res.status(200).json({message: 'username or password wrong'})
                } else {
                    return compare(password, data.password)
                }
            })
            .then((data) => {
                if(data){
                    const token  = jwt.sign({username}, process.env.SECRET)
                    res.status(200).json({token})
                }
                else {
                    res.status(200).json({message: 'username or password wrong'})
                }
            })
            .catch(() => {
                next()
            })
        } else {
            res.status(200).json( {message: 'Please fill username and password'})
        }
    }
}

module.exports = UserController