const { Client } = require('@elastic/elasticsearch');
const env = process.env.NODE_ENV || 'DEV';
const config = require('../config')[env];

function createClient() {
    if (process.env.NODE_ENV === 'DEV'){
        return new Client({ node: config.es.uri });
    } else {
        return new Client({
            node: config.es.uri,
            auth: {
                username: config.es.username,
                password: config.es.password
            }
        });
    }
}

module.exports = createClient();
