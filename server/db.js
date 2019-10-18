require('dotenv').config();
const mongoose = require('mongoose');

const atlasUrl = `mongodb+srv://asadalikanwal:${process.env.DB_PASSWORD}@cluster-oaqxp.gcp.mongodb.net/dictionary?retryWrites=true&w=majority`
mongoose.connect(atlasUrl, (err) => {
    if(!err){
        console.log("Database is connected successfully");
    } else {
        console.log("Database failed to connect", err);
    }
})

module.exports = mongoose;