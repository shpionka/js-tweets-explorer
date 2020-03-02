const mongoose = require('mongoose');

const connection = require('./connection');

const authSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

module.exports = connection.model('Auth', authSchema);
