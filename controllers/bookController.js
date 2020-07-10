const {Book} = require('../models')
const validateBookCreate = require('../helpers/validateBook')
const {cleanser, offset} = require('../helpers/findBookCleanser');
const book = require('../models/book');

class BookController {
    static createBook (req,res,next){
        const validate = validateBookCreate(req.body)
        let random = Math.random().toString(36).substring(7);
        if(validate){
            const payload  = req.body
            payload.isbn = random
            Book.create(payload)
            .then((data) => {
                res.status(200).json({message: " Create success", dataBook: data.dataValues, status: "success"})
            })
            .catch(() => {
                next()
            })
        }
        else {
            res.status(200).json({message: "Please fill author and title", status: 'failed'})
        }
    }
    static updateBook (req,res,next){
        Book.update(req.body, 
            {
            where: {
                id: req.params.id,
            },
            returning: true
        })
        .then((data) => {
            if(data[0] === 0){
                res.status(200).json({message: "Wrong Id", status: 'failed'})
              }
              else {
                res.status(200).json({message: "Update Success", status: "success", dataBook: data[1][0].dataValues})
              }
        })
        .catch(() => {
            next()
        })
    }
    static deleteBook (req,res,next){
        Book.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
          if(data === 0){
            res.status(200).json({message: "Wrong Id", status: "failed"})
          }
          else {
            res.status(200).json({message: "Delete Success", status: "success"})
          }  
        })
        .catch(() => {
            next()
        })
    }
    static findBook (req,res,next){
        const {page, limit} = req.query
        const offsetBook = offset(page, limit)
        let dataOffsetLimit = false
        Book.findAll({limit: limit, offset: offsetBook})
        .then((dataOffset) => {
            dataOffsetLimit = dataOffset
            return Book.findAll()
        })
        .then((data) => {
            const dataFormated = cleanser(dataOffsetLimit)
            const dataSorted = dataFormated.sort((a,b) => {return a.id - b.id})
            res.status(200).json(
                    {
                        status: "success", 
                        dataBook: dataSorted, 
                        message: 'Find book success', 
                        meta: {page, limit, totalData: data.length}
                    }
                )

        })
        .catch(() => {
            next()
        })
    }
    static findBookOne (req,res,next){
        Book.findOne({where: {id: req.params.id}})
        .then((data) => {
            res.status(200).json({status: "success", dataBook: data.dataValues, message: 'Find book success'})
        })
        .catch(() => {
            next()
        })
    }
}

module.exports = BookController