module.exports = {
    DEV: {
        mongodb: {
            uri: 'mongodb://localhost/js-tweets-explorer',
        },
    },
    PROD: {
        mongodb: {
            uri: process.env.DB_CONNECTION_STRING,
        },
    }
};
