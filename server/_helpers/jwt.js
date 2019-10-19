const jwt = require('jsonwebtoken');
const util = require('util');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);


const jwtSign = (obj) => sign(obj, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
});

const jwtVerify = (token) => verify(token, process.env.JWT_SECRET_KEY)

module.exports = {
    jwtSign,
    jwtVerify,
}