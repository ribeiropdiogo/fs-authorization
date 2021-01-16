const mongoose = require('mongoose')

var acessSchema = new mongoose.Schema({
    user: String,
    owner: String,
    operation: String,
    target: String,
    code: String,
    authorized: Boolean
  });

module.exports = mongoose.model('acess', acessSchema)