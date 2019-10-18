const router = require('express').Router();

const User = require('../models/users');


router.get('/', (req, res, next) => {
    User.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            return next("Error: Users not found");
        }
    });
})

router.get('/:email', (req, res, next) => {
    User.findOne({
        email: req.params.email
    }, (err, doc) => {
        if (!err) {

            if (doc) {
                res.send({
                    result: true
                });
            } else {
                res.send({
                    result: false
                });
            }

        } else {
            return next("Error: Users not found");
        }
    });
})

router.post('/', (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    newUser.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            return next("Error: Users not saved");
        }
    });
})

module.exports = router;