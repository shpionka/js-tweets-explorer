# Tweets explorer

DEMO:
https://tweets-explorer.web.app/

Tweets explorer helps you to find best tweets by hashtag `#javascript`.
It's build with help of React, Node, Express, Mongo, ElasticSearch, Serverless and ❤️

Tweets explorer consists of 4 parts:

#### Simple react front-end 
It uses material UI and is built on top of create react app.
#### API server
API server is build using Express js and exposes simple API to search tweets in Elastic Search or get 10 latest tweets from DB.
#### Collector service
Collector polls tweeter API to get latest tweets. We keep track of last tweet received and use it to get newest tweets only.  
#### Sync service
Sync service helps to keep elastic search and mongo consistent. It reads batches of tweets from Mongo and writes them to ES.  


## Hosting
App is hosted using Serverless and AWS lambda.
UI is hosted with firebase, because it's free and has domain name attached to it.

 
