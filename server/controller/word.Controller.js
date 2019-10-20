const router = require('express').Router();
const words = require('../models/words');
const users = require('../models/users');
//--------------------------------------

router.post('/api/search', (req, res) => {
    newWord: words;

    //1- search within words collection
    localDbSearch(req, res, words);

    //2- fetch by calling wordsApi 
    onlineWordApiSearch(req, res, words);

    //3- add to words collectoin
    addToWordsCollection(newWord);

    //4- add to users collection
    addToUsersCollectio();
});

//-------- Helpers ---------------------
function localDbSearch(req, res, newWord) {
    words.findOne(
        { vocabulary: req.body.vocabulary },
        async (err, data) => {
            if (data) {
                res.status(200).send({
                    data // filter questions out!
                })
            }
        });
}

function onlineWordApiSearch(req, res, newWord) {
    // need to return res
    fetch(
        'https://wordsapiv1.p.mashape.com/words/' + req.body.vocabulary,
        {
            method: 'post',
            mode: 'cors',
            cache: "no-cache",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'client_id': '',
                'client_secret': '',
                'grand_type': 'client_credentials'
            })
        }
    ).then((data) => {
        newWord.vocabulary = req.body.vocabulary;
        for (const itr of data.results) {
            newWord.definition = itr.definition;
            newWord.partOfSpeach.push(itr.partOfSpeach);
            newWord.synonyms.push(itr.synonyms);
            newWord.typeOf.push(itr.typeOf);
            newWord.hasTypes.push(itr.hasTypes);
            newWord.derivation.push(itr.derivation);
            newWord.example.push(itr.example);
            //newWord.questions.push({});
        }
        newWord.syllables.count = data.results.syllables.count;
        for (const itr of data.syllables.list) {
            newWord.syllables.list.push(itr);
        }
        newWord.pronunciation.all = data.results.pronunciation;
        newWord.frequency = data.frequency
    });

}

function addToWordsCollection(newWord) {
    newWord.questions.push({});
    words.insertMany(newWord);
}

function addToUsersCollectio(newWord) {
    userWord = {
        vocabulary=newWord.vocabulary,
        priority = 10
    }
    users.findOne(
        { _id: req.body.id })
    // to be completed
    // get that user and add the word to his list @userWord
}
//--------------------------------------
module.exports = router;