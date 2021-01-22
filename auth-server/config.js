var config = {};

let users = new Map()

users.set('ribeiro', {email: "ribeiropdiogo@gmail.com"})
users.set('luis', {email: "nike@sapo.pt"})
users.set('root', {email: "nike@sapo.pt"})

config.users = users;

module.exports = config;