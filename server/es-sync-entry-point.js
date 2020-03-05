const syncService = require("./services/sync-service");

async function elasticSearchSync() {
    await syncService.syncTweetsToElasticSearch();
}

module.exports.handler = (event) => {
    console.log('Received event', event);
    return elasticSearchSync()
        .then(() => console.log('Successfully synced'))
        .catch(e => console.log('Couldnt sync tweets', e));
};
