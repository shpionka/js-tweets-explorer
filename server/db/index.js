const TweetModel = require('./tweet-model');
const syncStatus = require('../constants/sync-status');

async function insertTweets(tweets) {
    // filter out existing tweets
    const tweetIds = tweets.map(t => t.id_str);
    const existingTweetsIds = (await TweetModel.find({ tweet_id: { "$in" : tweetIds} })).map(t => t.tweet_id);

    const filteredTweets = tweets.filter(t => existingTweetsIds.indexOf(t.id_str) === -1);

    const tweetModels = filteredTweets.map(tweet => {
        return convertTweetToRawTweetModel(tweet, syncStatus.INITIAL_STATUS);
    });

    return TweetModel.insertMany(tweetModels);
}

function findLatestTweets(limit) {
    return TweetModel.find().sort({ created_at: -1 }).limit(limit)
}

function findTweetsBySyncStatus(limit, syncStatus) {
    return TweetModel.find({sync_status: syncStatus}).limit(limit)
}

function countTweetsByStatus(status) {
    return TweetModel.count({sync_status: status})
}

function patchTweetSyncStatus(tweetIds, syncStatus) {
    return TweetModel.updateMany({ tweet_id: { "$in" : tweetIds} }, {sync_status: syncStatus})
}

function convertTweetToRawTweetModel(tweet, syncStatus) {
    return {
        tweet_id: tweet.id_str,
        text: tweet.text,
        username: tweet.user.screen_name,
        retweet_count: tweet.retweet_count,
        favorite_count: tweet.favorite_count,
        created_at: Date.now(),
        updated_at: Date.now(),
        sync_status: syncStatus
    };
}


module.exports = {insertTweets, findLatestTweets, patchTweetSyncStatus, findTweetsBySyncStatus, countTweetsByStatus};

