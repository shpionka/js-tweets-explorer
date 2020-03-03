const express = require('express');
const cors = require('cors');
const app = express();

const searchService = require('./services/search-service');
const syncService = require('./services/sync-service');
const collectorService = require('./services/tweet-collector-service');

app.use(cors());

app.get('/health', (req, res) => {
    res.send('OK')
});

app.get('/api/tweets', async (req, res) => {
    let results = [];
    if (req.query && req.query.q){
        // if have have query, let's send request to elastic
        results = await searchService.searchTweets(req.query.q);
    } else {
        // if we don't have query let's fetch latest inserted tweet-item
        results = await searchService.findLatestTweets(10);
    }

    res.send(results);
});

app.get('/debug/clear-es', async (req, res) => {
    const result = await syncService.clearESTweets();
    res.send(result)
});

app.get('/debug/sync-status', async (req, res) => {
    const diff = await syncService.getDBAndElasticSearchDiff();
    res.send({
        diff
    })
});

app.get('/debug/collector', async (req, res) => {
    const tweets = await collectorService.getTweets('#javascript');
    await collectorService.storeTweets(tweets);
    res.send('success')
});

app.get('/debug/sync', async (req, res) => {
    await syncService.syncTweetsToElasticSearch();
    res.send('success')
});

module.exports = app;
