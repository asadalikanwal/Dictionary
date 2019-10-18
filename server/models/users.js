const mongoose = require('mongoose');

const user = mongoose.model('users', {
    email: {type: String},
    password: {type: String }
})

module.exports = user;