const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const gameSchema = new Schema({
    type: Number, // 0 = Quiz, 1 = competition
    user1: {
        email: String,
        result: Number,
        done: Boolean
    },
    user2: {
        email: String,
        result: Number,
        done: Boolean
    },
    questions: [{
        header: String,
        answer: String,
        options: [],
        question_result: {
            user1: String,
            user2: String
        }
    }],
    winner: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Game = mongoose.model('game', gameSchema)

module.exports = Game;