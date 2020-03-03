import React, {useEffect} from 'react';

const TweetItem = ({tweet}) => {

    return (
        <div>
            {tweet.tweet_id} -
            {tweet.text} -
            {tweet.username} -
            {tweet.retweet_count} -
            {tweet.favorite_count}
        </div>
    )
};

export default TweetItem;
