function errorHandle (req,res, next){
    res.status(500).json({message: 'server Error'})
}
function wrongRoute (req,res, next){
    res.status(400).json({message: 'routing not defined'})
}

module.exports = {errorHandle, wrongRoute}