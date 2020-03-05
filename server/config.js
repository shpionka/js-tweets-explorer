module.exports = {
    DEV: {
        es: {
            uri: 'http://localhost:9200'
        },
        mongodb: {
            uri: 'mongodb://localhost/js-tweets-explorer',
        },
        twitter: {
            pageSize: 10,
            consumerKey: process.env.JS_TWEETS_TWEETER_CONSUMER_KEY,
            consumerSecret: process.env.JS_TWEETS_TWEETER_CONSUMER_SECRET
        },
        sync: {
            pageSize: 20
        }
    },
    PROD: {
        es: {
            uri: process.env.JS_TWEETS_ES_HOSTNAME,
            username: process.env.JS_TWEETS_ES_USERNAME,
            password: process.env.JS_TWEETS_ES_PASSWORD
        },
        mongodb: {
            uri: process.env.DB_CONNECTION_STRING,
        },
        twitter: {
            pageSize: 100,
            consumerKey: process.env.JS_TWEETS_TWEETER_CONSUMER_KEY,
            consumerSecret: process.env.JS_TWEETS_TWEETER_CONSUMER_SECRET
        },
        sync: {
            pageSize: 200
        }
    }
};
