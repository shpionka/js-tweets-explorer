const serverlessHttp = require('serverless-http');
const api = require('./api');
const es = require('./elastic-search');

const syncService = require('./services/sync-service');
const collectorService = require('./services/tweet-collector-service');

async function init(){
    await es.createIndexIfNotExist();
}

function dev    (){
    init().then(() => {
        api.listen(8000, () => {
            console.info('Listening on port 3000')
        });
        setInterval(async () => {
            const tweets = await collectorService.getTweets('#javascript');
            await collectorService.storeTweets(tweets);
        }, 5000);

        setInterval(async () => {
            await syncService.syncTweetsToElasticSearch();
        }, 10000);

    }).catch(e => {
        console.error("Unable to start server", e);
        process.exit(-1);
    });
}

if (process.env.NODE_ENV === 'DEV'){
    dev();
}

module.exports.handler = serverlessHttp(api);
