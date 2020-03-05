import React from 'react';
import TweetItem from "../tweet-item/TweetItem";

const TweetList = ({tweets}) => {

    const list = tweets.map((t) => {
        return <TweetItem key={t.tweet_id} tweet={t}/>
    });

    return (
        <div>
            {list.length === 0 ? <h2>No results</h2> : list}
        </div>
    )
};

export default TweetList;
