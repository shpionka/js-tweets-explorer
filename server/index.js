const api = require('./api');
const es = require('./elastic-search');

async function init(){
    await es.createIndexIfNotExist();
}

init().then(() => {
    api.listen(3000, () => {
        console.info('Listening on port 3000')
    });
}).catch(e => {
    console.error("Unable to start server", e);
    process.exit(-1);
})

