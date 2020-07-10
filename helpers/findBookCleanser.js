function cleanser (data){
    const formated = data.map(el => el.dataValues)
    return formated
}
function offset (page, limit) {
    if(Number(page) === 1){
        return 0
    }
    else {
        return limit * (page-1)
    }
}

module.exports = {cleanser, offset}