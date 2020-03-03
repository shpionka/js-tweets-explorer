import React, {useState, useEffect} from 'react';
import './App.scss';
import Headline from './components/headline/headline';
import Search from './components/search/search';
import TweetList from './components/tweet-list/TweetList';
import {fetchTweets, queryTweetsByKeyword} from "./api/api";

function App() {
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchTweets().then((result) => {
            setTweets(result);
        }).catch(e => {
            setError(e);
        }).finally(() => setIsLoading(false));
    }, []);

    function search(keyword) {
        setIsLoading(true);
        queryTweetsByKeyword(keyword).then((result) => {
            setTweets(result);
        }).catch(e => setError(e)).finally(() => setIsLoading(false));
    }

    return (
        <div className="app">
            <div className="top-content">
                <Headline/>
            </div>
            <Search onSubmit={search}/>
            {
                isLoading ? <h2>Loading</h2> :
                    error ?
                        <h2>Oops, something went wrong</h2> :
                        <TweetList tweets={tweets}/>
            }
        </div>
    );
}

export default App;
