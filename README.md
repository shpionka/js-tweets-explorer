# Tweets explorer

DEMO:
https://tweets-explorer.web.app/

Tweets explorer helps you to find best tweets by hashtag `#javascript`.
It's build with help of React, Node, Express, Mongo, ElasticSearch, Serverless and ❤️

## Design

Tweets explorer consists of 4 parts:

![Dev design](https://user-images.githubusercontent.com/9405042/76016755-b5fa6e00-5f1d-11ea-8c95-f7b38b2bc21d.png)

#### Simple react front-end 
It uses material UI and is built on top of create react app.
#### API server
API server is build using Express js and exposes simple API to search tweets in Elastic Search or get 10 latest tweets from DB.
#### Collector service
Collector polls tweeter API to get latest tweets. We keep track of last tweet received and use it to get newest tweets only.  
#### Sync service
Sync service helps to keep elastic search and mongo consistent. It reads batches of tweets from Mongo and writes them to ES.  


## Development Running locally
For running locally I used docker-compose:
```
cd server;

# Run server part
docker-compose up

cd ../client

# Run client part
yarn install && yarn start

# If you need - rebuild container:
docker-compose build
```

For simplification `Collector` and `Sync` are running with `setIntervals`. 

## Hosting & Deployment
Server is hosted using Serverless and AWS lambda. It requires serverless setup and AWS account and can be deployed by running:
```
# Actual deploy
npm run deploy

# API logs 
npm run logs:api:watch

# Collector logs 
npm run logs:collector:watch

# Sync logs 
npm run logs:sync:watch
```

Front-end is hosted with firebase, because it's free and has domain name attached to it. It requires firebase account and can be deployed with:
```
yarn build:prod && yarn deploy
```

## Not completed
- [ ] Didn't provide tests, since ran out of time
- [ ] Search is prefix based only. Elasic Search is quite new to me, but query can be improved. 
- [ ] No throttling support for Twitter. 









 
