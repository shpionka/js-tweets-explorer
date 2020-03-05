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


## Hosting & Deployment
Server is hosted using Serverless and AWS lambda. It requires serverless setup and AWS account and can be deployed by running:
```
npm run deploy
```

Front-end is hosted with firebase, because it's free and has domain name attached to it. It requires firebase account and can be deployed with:
```
yarn deploy
```

## Not completed
- [ ] Didn't provide tests, since ran out of time
- [ ] Used locally installed Docker and Elasic Search, ideally I'd use Docker/Docker-Compose for local setup.
- [ ] Search is prefix based only. Elasic Search is quite new to me, but query can be improved. 
- [ ] No throttling support for Twitter. 









 
