var Access = require('../models/acess')

module.exports.insert = a => {
    var novo = new Access(a)
    return novo.save()
}

module.exports.list = () => {
    return Access
        .find()
        .exec()
}

module.exports.check = id => {
    return Access
        .findOne({consult_code: id})
        .exec()
}

module.exports.authorize = function(code){
    return Access.findOneAndUpdate({code: code}, {authorized: true}, {new: true})
}