const db = require('../db');
const es = require('../elastic-search');

function findLatestTweets(limit) {
    return db.findLatestTweets(limit);
}

async function searchTweets(query) {
    const result = await es.search(query);
    return result.map(esDoc => {
        return esDoc._source;
    })
}

module.exports = {
    findLatestTweets,
    searchTweets
};
