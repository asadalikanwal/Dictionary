const mongoose = require('mongoose');

const user = mongoose.model('user', {
    email: {type: String, unique:true, require:true},
    fullName: {type: String, require:true},
    password: {type: String },
    isActive:{type: Number},
    words:[{
        name:String,
        priority:Number,

    }],
    quizScore:Number,
    computationScore:Number,
    quizFrequency:Number,
    lastLogin:Date 

})

module.exports = user;