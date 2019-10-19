const mongoose = require('mongoose');

const user = mongoose.model('user', {
    email: {type: String},
    password: {type: String }
})

module.exports = user;