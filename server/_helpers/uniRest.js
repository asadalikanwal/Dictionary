const unirest = require('unirest');

const uniRestGet = (url) => {
    return new Promise(function (resolve, reject) {
        unirest.get(url)
            .header("X-Mashape-Key", process.env.WORD_API_KEY)
            .header("Accept", "application/json")
            .end(function (result) {
                // console.log("RESULT: ", result.status, result.headers, result.body);
                resolve(result.body);
            });
    })
}

module.exports = uniRestGet;