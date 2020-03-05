import axios from "axios";
import config from '../config';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export async function fetchTweets() {
    const response =  await axios.get(`${config.api}/api/tweets`);
    return response.data;
}

export async function queryTweetsByKeyword(keyword) {
    const response =  await axios.get(`${config.api}/api/tweets?q=${keyword}`);
    return response.data;
}
