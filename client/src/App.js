import React, {useState, useEffect} from 'react';
import Headline from './components/headline/headline';
import Search from './components/search/search';
import TweetList from './components/tweet-list/TweetList';
import {fetchTweets, queryTweetsByKeyword} from "./api/api";

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    app: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

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

    const classes = useStyles();

    return (
        <Container className={classes.app}>
            <CssBaseline />
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
        </Container>
    );
}

export default App;
