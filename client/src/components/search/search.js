import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '5px',
        marginBottom: '10px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        [theme.breakpoints.up('md')]: {
            width: 500,
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

const Search = ({onSubmit}) => {

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleChange = (event) => {
        setSearchKeyword(event.target.value);

        if (searchKeyword.length > 0) {
            onSubmit(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(searchKeyword);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        onChange={handleChange}
                        placeholder="Search tweets"
                        autoFocus
                        inputProps={{ 'aria-label': 'search tweets' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </form>
        </div>
    )
};

export default Search;
