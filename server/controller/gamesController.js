const router = require('express').Router();
const Game = require('../models/games');

// To start a new game
router.post('/', (req, res, next) => {
    console.log("wroks");
    const newGame = new Game(req.body);
    newGame.save((err, docs) => {
        if(!err) {
            res.send(docs);
        } else {
            return next 
        }
    })
})

// To find a game by gameID
router.get('/:gameid', (req, res, next) => {
    Game.findById(req.params.gameid, (err, doc) => {
        if(!err) {
            if(doc){
                res.send(doc);
            } else {
                next({
                    "message": "Not able to find the game"
                })
            }
        } else {
            return next({
                "message": "Not able to find the game"
            })
        }
    })
})



module.exports = router;