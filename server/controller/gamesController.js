const router = require('express').Router();
const Game = require('../models/games');

router.post('/', (req, res, next) => {
    
    const newGame = new Game(req.body);
    console.log("LEts check", newGame);
    newGame.save((err, docs) => {
        if(!err) {
            res.send(docs);
        } else {
            return next 
        }
    })
})



module.exports = router;