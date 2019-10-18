const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lab14', (err) => {
    if(!err){
        console.log("Database is connected successfully");
    } else {
        console.log("Database failed to connect", err);
    }
})

module.exports = mongoose;