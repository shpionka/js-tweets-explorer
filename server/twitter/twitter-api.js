const axios = require('axios');
const btoa = require('btoa');
const querystring = require('querystring');

async function fetchAuthToken() {

    const consumerKey = "FXWOhfwf0LMPJdBGJEOZRWTHi";
    const consumerSecret = "71rqL0jN0wWli8GLJuLL3eaNLngyzg6Ro2XNVNkQHySRoJckiZ";

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
            count: 10,
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
