import React, {useState} from 'react';
import './search.scss';

const Search = ({onSubmit}) => {

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleChange = (event) => {
        setSearchKeyword(event.target.value);

        if (searchKeyword.length > 0){
            onSubmit(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(searchKeyword);
    };

    return (
        <div className='search'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Search...' onChange={handleChange}/>
                <input type='submit'/>
            </form>
        </div>
    )
};

export default Search;
