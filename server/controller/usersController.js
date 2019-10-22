const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/users");
const {
  jwtVerify
} = require("../_helpers/jwt");

//to get all the active users
router.get("/", async (req, res, next) => {
  User.find({
    isActive: 1
  }, (err, docs) => {
    if (!err) {
      console.log("docs", docs);
      if (docs) {
        res.send(docs);
      } else {
        return res.status(404).send({
          "Error": "No active users"
        });
      }
    } else {
      return next({
        "Error": "Problem with DB connection"
      });
    }
  });

});

router.get("/:email", (req, res, next) => {
  User.findOne({
      email: req.params.email
    }, {
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
router.post("/", async (req, res, next) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = await User.findOne({
    email: req.body.email
  });

  console.log("User", user)

  if (!req.body.fullName) {
    res.send({
      result: "Please provide full name"
    });
  } else if (user) {
    res.send({
      result: "this email has been used"
    });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: hash,
      isActive: 2,
      fullName: req.body.fullName,
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


//Logout the user, by changing isActive to 2
router.put("/logout", async (req, res, next) => {
  console.log("req.body.id", req.body.id);
  await User.findOneAndUpdate({
    _id: req.body.id
  }, {
    isActive: 2
  }, {
    new: true
  }, (err, doc) => {
    if (!err) {
      if (doc) {
        res.send({
          "result": "User logout"
        });
      }else {
        res.send({
          "result": "Not able to find any user"
        });
      }

    } else {
      return next("Error: Database not working");
    }
  })
});

module.exports = router;