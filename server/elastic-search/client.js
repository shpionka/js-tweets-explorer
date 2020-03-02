const { Client } = require('@elastic/elasticsearch');

function createClient() {
    const client = new Client({ node: 'http://localhost:9200' });
    return client;
}

module.exports = createClient();
