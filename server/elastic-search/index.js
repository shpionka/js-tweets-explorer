const  client = require("./client");

async function createIndexIfNotExist(){
    try {
        await client.indices.get({
            index: 'tweets'
        });
    } catch (e) {
        await client.indices.create({
            index: 'tweets',
            body: {
                mappings: {
                    properties: {
                        tweet_id: { type: 'keyword' },
                        text: { type: 'text' },
                        username: { type: 'keyword' },
                        retweet_count: {type: 'number'},
                        favorite_count: {type: 'number'}
                    }
                }
            }
        },{ ignore: [400] });
    }
}

async function dropIndexes(){
    return await client.indices.delete({
        index: 'tweets'
    });
}

async function search(query){
    const { body } = await client.search({
        index: 'tweets',
        body: {
            query: {
                prefix: {
                    text:  {
                        value: query
                    }
                }
            }
        }
    });

    return body.hits.hits;
}

async function count(){
    const result =  await client.count({ index: 'tweets' });
    return result.body.count;
}

async function bulkInsert(tweets){

    const body = tweets.map(t => {
        return {
            tweet_id: t.tweet_id,
            text: t.text,
            username: t.username
       };
    }).flatMap(doc => [{ index: { _index: 'tweets' } }, doc]);

    const { body: bulkResponse } = await client.bulk({
        refresh: true,
        body
    });

    if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
                erroredDocuments.push({
                    // If the status is 429 it means that you can retry the document,
                    // otherwise it's very likely a mapping error, and you should
                    // fix the document before to try it again.
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: body[i * 2],
                    document: body[i * 2 + 1]
                })
            }
        });
        console.log(erroredDocuments)
    }
}

module.exports = {createIndexIfNotExist, bulkInsert, search, dropIndexes, count};
