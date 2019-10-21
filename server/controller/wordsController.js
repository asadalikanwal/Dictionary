const router = require('express').Router();
const words = require('../models/words');
const users = require('../models/users');
const unirest = require('unirest');

router.get('/:vocabulary', async (req, res) => {

    console.log("1.0 ")
    //1- search within words collection
    let result = await localDbSearch(req, res);
    console.log(result)
    console.log("1.1 ")

    console.log("2.0 ")
    // 2- fetch by calling wordsApi 
    if (!result) {
        console.log("2.1.0 ")
        result = await onlineWordApiSearch(req, res);
        console.log("2.1.1 ")

        //3- add to words collection
        if (result) {
            console.log("3.0.0 ")
            await addToWordsCollection(result);
            console.log("3.1.0 ")
        }
    }

    // //4- add to users collection
    // addToUsersCollectio();
});

//-------- Helpers ---------------------
function localDbSearch(req, res) {
    console.log("1.0.1 ")

    return words.findOne({
        word: req.params.vocabulary
    }, {
        questions: 0
    });
}

async function onlineWordApiSearch(req, res) {
    console.log("2.1.1 ")

    return new Promise(function (resolve, reject) {
        unirest.get("https://wordsapiv1.p.mashape.com/words/" + req.params.vocabulary)
            .header("X-Mashape-Key", process.env.WORD_API_KEY)
            .header("Accept", "application/json")
            .end(function (result) {
                // console.log("RESULT: ", result.status, result.headers, result.body);
                resolve(result.body);
                reject(console.error(""))
            });
    });
}

function addToWordsCollection(newWord) {
    words.insertMany(newWord);
}

function addToUsersCollectio(req, newWord) {
    // userWord = {
    //     word: newWord.vocabulary,
    //     priority: 10
    // };
    // users.({
    //     _id: req.body.id
    // })

    // users.findOne(
    //     {conditoijn},
    //     {projection})

    // to be completed
    // get that user and add the word to his list @userWord
}
//--------------------------------------
module.exports = router;