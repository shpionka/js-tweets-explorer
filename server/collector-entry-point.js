const collectorService = require("./services/tweet-collector-service");

async function collectTweets() {
    const tweets = await collectorService.getTweets('#javascript');
    await collectorService.storeTweets(tweets);
}

module.exports.handler = (event) => {
    console.log('Received event', event);
    return collectTweets().then(()=> {
        console.log('Collected tweets')
    }).catch(e => console.error("Can't collect tweets ", e));
};
