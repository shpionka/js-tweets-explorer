const mongoose = require('mongoose');

const connection = require('./connection');

const twitterQueryMeta = new mongoose.Schema({
    hashtag: {
        type: String,
        required: true,
        unique: true
    },
    since_id: {
        type: String,
        required: true
    }
});

module.exports = connection.model('twitterQueryMeta', twitterQueryMeta);
