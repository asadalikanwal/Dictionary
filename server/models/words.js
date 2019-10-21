const mongoose = require('mongoose');

const word = mongoose.model('word', {
    word: String,
    results: [{
        definition: String,
        partOfSpeach: String,
        synonyms: [String],
        typeOf: [String],
        hasTypes: [String],
        derivation: [String],
        example: [String],
        questions: [{
            header: String,
            answer: String,
            options: [String]
        }]
    }],
    syllables: {
        count: Number,
        list: [String]
    },
    pronunciation: {
        all: String
    },
    frequency: Number
})

module.exports = word;