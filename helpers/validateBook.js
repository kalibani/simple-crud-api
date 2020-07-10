function validateCreateBook(body){
    if(body.title && body. author){
        return true
    }
    return false
}

module.exports = validateCreateBook