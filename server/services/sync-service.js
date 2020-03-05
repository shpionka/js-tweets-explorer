const db = require('../db');
const syncStatus = require('../constants/sync-status');
const es = require('../elastic-search');
const env = process.env.NODE_ENV || 'DEV';
const config = require('../config')[env];

async function syncTweetsToElasticSearch() {
    console.info('Syncing tweets to elastic search');
    const notSyncedTweets = await db.findTweetsBySyncStatus(config.sync.pageSize, syncStatus.INITIAL_STATUS);
    console.info('Found tweeets to sync to elastic search', notSyncedTweets.length);

    if (notSyncedTweets.length > 0) {
        await es.bulkInsert(notSyncedTweets);
        console.info('Inserted tweets to elastic search');
    }

    await db.patchTweetSyncStatus(notSyncedTweets.map(t => t.tweet_id), syncStatus.SYNCED_STATUS);
    console.log('Marked tweets as synced');
}

async function getDBAndElasticSearchDiff() {
    const syncedTweetsCount = await db.countTweetsByStatus(syncStatus.SYNCED_STATUS);
    const notSyncedTweets = await db.countTweetsByStatus(syncStatus.INITIAL_STATUS);
    const esTweetsCount = await es.count();

    return {
        syncedTweetsCount,
        notSyncedTweets,
        esTweetsCount
    };
}

async function clearESTweets() {
    await es.dropIndexes();
    await es.createIndexIfNotExist();
}

module.exports = {
    syncTweetsToElasticSearch,
    getDBAndElasticSearchDiff,
    clearESTweets
};
