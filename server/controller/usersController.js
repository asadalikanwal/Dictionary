const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/users');
const {jwtVerify} = require('../_helpers/jwt');

router.get('/', async (req, res, next) => {

    try {
        const token = req.cookies.access_token;
        const decoded = await jwtVerify(token);

        User.find((err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                return next("Error: Users not found");
            }
        });
    } catch (e) {
        return next({'message' : 'User is not authorized'})
    }
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





module.exports = router;