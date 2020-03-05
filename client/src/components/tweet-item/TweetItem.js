import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 15
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function TweetItem({tweet}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <Link target="_blank" href={`https://twitter.com/${tweet.username}/status/${tweet.tweet_id}`}>Tweet Id: {tweet.tweet_id}</Link> by @{tweet.username}
                </Typography>
                <Typography variant="h6" component="h6">
                    {tweet.text}
                </Typography>
            </CardContent>
        </Card>
    );
}
