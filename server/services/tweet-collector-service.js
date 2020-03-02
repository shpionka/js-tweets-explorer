const AuthModel = require('../db/auth-model');
const TwitterQueryMetaModel = require('../db/twitter-query-meta-model');
const twitterApi = require('../twitter/twitter-api');

const db = require('../db');

async function getTweets(hashtag){
    const token = await getOrGenerateToken();

    let twitterQueryMetadata = await TwitterQueryMetaModel.findOne({ hashtag: hashtag });
    let sinceId = undefined;
    if (twitterQueryMetadata){
        sinceId = twitterQueryMetadata.since_id
    }

    console.info('Found query metadata for hashtag', hashtag);
    try {
        const queryResults = await twitterApi.queryTweets(token, hashtag, sinceId);
        console.info('Fetched tweets');

        const latest = queryResults.statuses[0];
        const latestStrId = (latest || {}).id_str;

        if (twitterQueryMetadata){
            twitterQueryMetadata.since_id = latestStrId || '0';
        } else {
            twitterQueryMetadata = new TwitterQueryMetaModel({
                hashtag: hashtag,
                since_id: latestStrId
            })
        }

        await twitterQueryMetadata.save();
        console.info('Updated query metadata for hashtag', hashtag);
        return queryResults.statuses;
    } catch(error){
        if (error && error.response && error.response.status === 401){
            console.log('Token has expired, deleting token');
            return await AuthModel.deleteOne();
        } else {
            console.error('Unable to fetch tweets', error);
            throw error;
        }
    }
}

function storeTweets(tweets){
    return db.insertTweets(tweets);
}

async function getOrGenerateToken(){
    const tokenInfo = await AuthModel.findOne();
    if (tokenInfo){
        return tokenInfo.token;
    } else {
        console.log('Fetching auth token from twitter');
        const token = await twitterApi.fetchAuthToken();
        console.log('Fetched auth token from twitter');
        await new AuthModel({token: token}).save();
        console.log('Stored new auth token');
        return token;
    }
}

module.exports = {
    getTweets,
    storeTweets
};
