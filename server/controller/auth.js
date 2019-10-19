var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const {
    jwtSign
} = require('../_helpers/jwt');
const User = require('../models/users');

router.post('/', (req, res, next) => {
    User.findOne({
        email: req.body.email
    }, async (err, docs) => {
        if (err) {
            return next({
                "message": "Something went wrong, DB not responding"
            });
        }

        if (docs) {
            const passwordMatch = bcrypt.compareSync(req.body.password, docs.password);
            console.log("passwordMatch", passwordMatch);
            if (passwordMatch) {

                const payload = {
                    _id: docs._id,
                    email: docs.email
                }

                const token = await jwtSign(payload);

                res.cookie("access_token", token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    // secure: true
                });

                res.status(200).send({
                    "message": "Authorization successssssss",
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