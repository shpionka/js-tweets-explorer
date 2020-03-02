const mongoose = require('mongoose');

const connection = require('./connection');
const Status = require('../constants/sync-status');

const tweetSchema = new mongoose.Schema({
    tweet_id: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        maxlength: 500,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    retweet_count: {
        type: Number,
    },
    favorite_count: {
        type: Number,
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    sync_status: {
        type: String,
        required: true,
        enum: [Status.INITIAL_STATUS, Status.SYNCED_STATUS]
    }
});

module.exports = connection.model('Tweet', tweetSchema);
