const router = require('express').Router();
const words = require('../models/words');
const users = require('../models/users');
const uniRestGet = require('../_helpers/uniRest');
// const unirest = require('unirest');

router.get('/', async (req, res, next) => {
    return users.findOne({
        _id: req.currentUser._id
    }, {
        words: 1
    }, (err, docs) => {
        if (!err) {
            if (docs)
                res.send(docs);
        } else {
            return next({
                "message": "Problem to connect with DB"
            })
        }
    });
   
});



router.get('/:vocabulary', async (req, res) => {

    console.log("1.0 ")
    //1- search within words collection
    let result = await localDbSearch(req, res);
    console.log("1.1 ", result);

    console.log("2.0 ")
    // 2- fetch by calling wordsApi 
    if (!result) {
        console.log("2.1.0 ")
        result = await onlineWordApiSearch(req, res);
        console.log("2.1.1 ", result);

        if(result.success === false){
            return res.send(result);
        }

        //3- add to words collection
        if (result.word) {
            const questions = await _addQuestions(req.params.vocabulary, result);
            result.questions = questions;
            // console.log("finalResult with question", result);

            console.log("3.0.0 ")
            await addToWordsCollection(req, res, result);
            console.log("3.1.0 ")
        }
    }

    console.log("4.0 ")
    // //4- add to users collection
    _addToUsersCollection(req);
    console.log("4.1 ")
});

//-------- Helpers ---------------------
function localDbSearch(req, res) {
    console.log("1.0.1 ")

    return words.findOne({
        word: req.params.vocabulary
    }, {
        questions: 0
    }, (err, docs) => {
        if (!err) {
            if (docs)
                res.send(docs);
        } else {
            return next({
                "message": "Problem to connect with DB"
            })
        }
    });
}

async function onlineWordApiSearch(req, res) {
    console.log("2.1.1 ")
    return uniRestGet("https://wordsapiv1.p.mashape.com/words/" + req.params.vocabulary);
}

function addToWordsCollection(req, res, modifiedWord) {
    const newWord = new words(modifiedWord);
    newWord.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            return next({
                "message": "Problem to connect with DB"
            })
        }
    })
}

async function _addQuestions(word, obj) {

    const rhymes = await uniRestGet(`https://wordsapiv1.p.mashape.com/words/${word}/rhymes`);

    console.log("rhymessssss:", rhymes);
    let allQuestions = [];
    for (const item of obj.results) {
        let question = {
            header: item.definition,
            answer: word,
            options: await _get3Rhymes(rhymes.rhymes.all, word)
        }
        allQuestions.push(question);
    }

    return allQuestions;

}

async function _get3Rhymes(myArray, answer) {
    console.log("-----------------------------------");
    let rhymes = [];
    console.log(" console.log(myArray);", myArray);
    let tempArray = (myArray) ? [...myArray] : [];
    console.log(" console.log(tempArray);", tempArray);
    let count = 0;
   
    if (myArray && myArray.length > 3) {
        console.log("IF");
        for (let index = 0; index <= 3; index++) {

            if (count == 3) {
                break;
            }
            console.log("tempArray.length", tempArray.length);
            let arrayindex = Math.floor(Math.random() * Math.floor(tempArray.length - 1));

            if (tempArray[arrayindex] != answer) {
                count++;
                console.log("ArrayIndex: " + arrayindex);
                console.log("Array String: " + tempArray.toString());
                const element = tempArray[arrayindex];
                rhymes.push(element);
            }
            tempArray.splice(arrayindex, 1);
        }
        // rhymes.push(answer);
        // console.log("rhymes", rhymes);
        // return rhymes;
    } else {
        console.log("ELSE");
        const dbwords = await words.aggregate([{
            $sample: {
                size: 3
            }
        }])

        dbwords.forEach(item => {
            if (item.word) {
                rhymes.push(item.word)
            } else {
                rhymes.push('potato');
            }
        })
    }
    rhymes.push(answer);
    console.log("rhymes", rhymes);
    return rhymes;
    Í
}

function _addToUsersCollection(req) {

    var conditions = {
        _id: req.currentUser._id,
        'words.name': {
            $ne: req.params.vocabulary
        }
    };

    var update = {
        $addToSet: {
            words: {
                name: req.params.vocabulary,
                priority: 10
            }
        }
    }

    users.findOneAndUpdate(conditions, update, function (err, doc) {
        console.log("Word save in User's array list")
    });
}
//--------------------------------------
module.exports = router;