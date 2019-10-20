const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/users");
const { jwtVerify } = require("../_helpers/jwt");

router.get("/", async (req, res, next) => {
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
    return next({ message: "User is not authorized" });
  }
});

router.get("/:email", (req, res, next) => {
  User.findOne(
    {
      email: req.params.email
    },
    (err, doc) => {
      if (!err) {
        if (doc) {
          res.json(doc);
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
router.post("/register", (req, res, next) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = User.findOne({ email: req.body.email });
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
        res.send(docs);
      } else {
        return next("Error: Users not saved");
      }
    });
  }
});
//deactivating member
router.delete("/:email", async (req, res, next) => {
  const userEmail = req.params.email;
  const user = await User.findById(userEmail);

  if (!user) {
    throw "user not found";
  }
  user.update({ $set: { isActive: 0 } });
});

//updating member status after login
router.put("/", (req, res, next) => {
  User.update(
    { email: req.body.email },
    {
      $set: {
        isActive: 1,
        lastLogin: Date.now()
      }
    }
  );
  res.json(true);
});

module.exports = router;