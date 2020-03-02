const db = require('../db');
const es = require('../elastic-search');

function findLatestTweets(limit) {
    return db.findLatestTweets(limit);
}

function searchTweets(query) {
    return es.search(query);
}

module.exports = {
    findLatestTweets,
    searchTweets
};
