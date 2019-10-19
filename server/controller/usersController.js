const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        email: req.body.email,
        password: hash
    });
    newUser.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            return next("Error: Users not saved");
        }
    });
})

router.post('/login', (req, res, next) => {
    User.findOne({
        email: req.body.email
    }, (err, docs) => {
        if (err) {
            return next({
                "message": "Something went wrong, DB not responding"
            });
        }

        if(docs){
            const passwordMatch = bcrypt.compareSync(req.body.password, docs.password);
            console.log("passwordMatch", passwordMatch);
            if (passwordMatch) {

                const token = jwt.sign({
                    _id: docs._id,
                    email: docs.email
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                });

                res.send({
                    "message": "Authorization success",
                    "token": token
                })
            } else {
                res.status(401).send({
                    "message": "Authorization failed"
                })
            }
        } else {
            res.status(401).send({
                "message": "Authorization failed"
            })
        }
    });
})

module.exports = router;