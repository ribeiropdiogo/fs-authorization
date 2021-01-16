var Access = require('../models/acess')

module.exports.insert = a => {
    var novo = new Acess(a)
    return novo.save()
}

module.exports.list = () => {
    return Access
        .find()
        .exec()
}

module.exports.check = id => {
    return Access
        .findOne({code: id})
        .exec()
}

module.exports.authorize = function(code){
    return Access.findOneAndUpdate({code: code}, {authorized: true}, {new: true})
}