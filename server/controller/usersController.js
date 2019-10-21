const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/users");
const {
    jwtVerify
} = require("../_helpers/jwt");

//to get all the active users
router.get("/", async (req, res, next) => {
    User.find((err, docs) => {
        if (!err) {
            if (docs.isActive === 1) {
                res.send(docs);
            } else {
                return res.status(404).send({
                    "Error": "No active users"
                });
            }
        } else {
            return next({
                "Error": "Something went wrong"
            });
        }
    });

});

router.get("/:email", (req, res, next) => {
    User.findOne({
            email: req.params.email
        },
        {
            password: 0
        },
        (err, doc) => {
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
        }
    );
});
//to register new member
router.post("/", (req, res, next) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = User.findOne({
        email: req.body.email
    });
    if (!user) {
        res.json("this email has been used");
    } else {
        const newUser = new User({
            email: req.body.email,
            password: hash,
            isActive: 2,
            quizFrequency: 0
        });

        newUser.save((err, docs) => {
            if (!err) {
                res.send({
                    result: true
                });
            } else {
                return next("Error: Users not saved");
            }
        });
    }
});
//deactivating member
router.delete("/:email", async (req, res, next) => {

    await User.findOneAndUpdate({
            email: req.params.email
        }, {
            isActive: 0
        }, {
            new: true
        },
        (err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                return next("Error: Database not working");
            }
        });
});

//updating member status after login
router.put("/", async (req, res, next) => {
    await User.findOneAndUpdate({
        email: req.body.email
    }, {
        isActive: 1,
        lastLogin: Date.now()
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            return next("Error: Database not working");
        }
    })


});

module.exports = router;