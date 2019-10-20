const router = require('express').Router();
const words = require('../models/words');
const users = require('../models/users');
const unirest = require('unirest');


router.get('/:vocabulary', async (req, res) => {
    // newWord = new words()

    //1- search within words collection
    let result = await localDbSearch(req, res);
    console.log('after local db call ');

    // 2- fetch by calling wordsApi 
    if (!result) {
        console.log('inside result ')
        result = onlineWordApiSearch(req, res);
    }
    // //3- add to words collection
    // addToWordsCollection(newWord);

    // //4- add to users collection
    // addToUsersCollectio();
});

//-------- Helpers ---------------------
function localDbSearch(req, res) {
    // words.findOne(
    //     { vocabulary: req.params.vocabulary },
    //     async (err, data) => {
    //         if (!err) {
    //             if (data) {
    //                 console.log('the data is : ' + data);
    //                 res.status(200).send({
    //                     data // filter questions out!
    //                 })
    //             }
    //             else {
    //                 console.log('No Data found');
    //                 //2- fetch by calling wordsApi 
    //                 // onlineWordApiSearch(req, res, newWord);
    //             }
    //         } else {
    //             console.log('the error is : ' + err);
    //         }
    //     });

    console.log('inside local db')
    return words.findOne({
        vocabulary: req.params.vocabulary
    }, {
        questions: 0
    });
}

function onlineWordApiSearch(req, res) {
    console.log('inside online search')

    unirest.get("https://wordsapiv1.p.mashape.com/words/school")
        .header("X-Mashape-Key", process.env.WORD_API_KEY)
        .header("Accept", "application/json")
        .end(function (result) {
            console.log("RESULT: ", result.status, result.headers, result.body);
        });


    // /----------------------------------------------------------
    // /----------------------------------------------------------
    // need to return res
    // fetch(
    //     'https://wordsapiv1.p.mashape.com/words/' + req.params.vocabulary,
    //     {
    //         method: 'get',
    //         mode: 'cors',
    //         cache: "no-cache",
    //         credentials: 'include',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             'client_id': '',
    //             'client_secret': '',
    //             'grand_type': 'client_credentials'
    //         })
    //     }
    // ).then((data) => {
    //     newWord.vocabulary = req.params.vocabulary;
    //     for (const itr of data.results) {
    //         newWord.definition = itr.definition;
    //         newWord.partOfSpeach.push(itr.partOfSpeach);
    //         newWord.synonyms.push(itr.synonyms);
    //         newWord.typeOf.push(itr.typeOf);
    //         newWord.hasTypes.push(itr.hasTypes);
    //         newWord.derivation.push(itr.derivation);
    //         newWord.example.push(itr.example);
    //         //newWord.questions.push({});
    //     }
    //     newWord.syllables.count = data.results.syllables.count;
    //     for (const itr of data.syllables.list) {
    //         newWord.syllables.list.push(itr);
    //     }
    //     newWord.pronunciation.all = data.results.pronunciation;
    //     newWord.frequency = data.frequency
    // });

}

function addToWordsCollection(newWord) {
    newWord.questions.push({});
    words.insertMany(newWord);
}

function addToUsersCollectio(req, newWord) {
    userWord = {
        vocabulary: newWord.vocabulary,
        priority: 10
    };
    users.findOne({
        _id: req.body.id
    })
    // to be completed
    // get that user and add the word to his list @userWord
}
//--------------------------------------
module.exports = router;