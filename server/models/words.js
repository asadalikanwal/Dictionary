const mongoose = require('mongoose');

const word = mongoose.model('word', {
    word: String,
    results: [{
        definition: String,
        partOfSpeech: String,
        synonyms: [String],
        typeOf: [String],
        hasTypes: [String],
        derivation: [String],
        example: [String],
    }],
    syllables: {
        count: Number,
        list: [String]
    },
    pronunciation: {
        all: String
    },
    frequency: Number,
    
    
    questions: [{
        header: String,
        answer: String,
        options: [String]
    }]
})

module.exports = word;