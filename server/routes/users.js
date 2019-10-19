var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:email', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res, next) => {
  userName = req.body.userName;
  password = req.body.password;

  // call database to 
  // 1- check the user username and password (findOne)
  // 2- insert into login collection [user Id, JWT, datetime, status]

})
module.exports = router;
