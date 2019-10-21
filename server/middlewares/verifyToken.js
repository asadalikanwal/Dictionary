const {
    jwtVerify
} = require("../_helpers/jwt");

const verifyToken = async (req, res, next) => {
    
    try {
        const decoded = await jwtVerify(req.token);

        if (decoded) {
            req.currentUser = decoded;
            console.log("VERIFIED TOKEN")
            console.log('SUCCESS: Connected to protected route');
            next();
        } else {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        }
    } catch (e) {
        res.sendStatus(403);
    }
}

module.exports = verifyToken;