//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {

    const header = req.cookies.access_token;
    console.log("checking...")
    if (typeof header !== 'undefined') {
        //     const bearer = header.split(' ');
        //     const token = bearer[1];
        //     req.token = token;
        req.token = req.cookies.access_token;
        console.log("CHECKED TOKEN")
        return next();
    } else {
        //If header is undefined return Forbidden (403)
        res.status(403).send({
            error: "Not authorized"
        })
    }
}

module.exports = checkToken;