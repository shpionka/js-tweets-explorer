const axios = require('axios');
const btoa = require('btoa');
const querystring = require('querystring');

const env = process.env.NODE_ENV || 'DEV';
const config = require('../config')[env];

async function fetchAuthToken() {

    const consumerKey = config.twitter.consumerKey;
    const consumerSecret = config.twitter.consumerSecret;

    const credentials = encodeURI(consumerKey) + ":" + encodeURI(consumerSecret);

    const credentialsBase64Encoded = btoa(credentials);

    try {
        const response = await axios.post('https://api.twitter.com/oauth2/token',
            "grant_type=client_credentials",
            {
                headers: {
                    "Authorization": `Basic ${credentialsBase64Encoded}`,
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });

        console.log('token token', response.data);

        return response.data.access_token;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

async function queryTweets(token, hashtag, sinceId) {
    try {
        const url = 'https://api.twitter.com/1.1/search/tweets.json';

        const qs = querystring.stringify({
            q: `#${hashtag}`,
            count: config.twitter.pageSize,
            since_id: sinceId
        });

        console.log('final url' , `${url}?${qs}`);

        const response = await axios.get(`${url}?${qs}`, {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept-Encoding": "gzip"
            }
        });
        return response.data;
    } catch(error) {
        console.error("Failed to get tweets", error.response.data.errors);
        throw error;
    }
}

module.exports = {queryTweets, fetchAuthToken};
