import axios from "axios";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export async function fetchTweets() {
    const response =  await axios.get('http://localhost:3000/api/tweets');
    return response.data;
}

export async function queryTweetsByKeyword(keyword) {
    const response =  await axios.get('http://localhost:3000/api/tweets?q=' + keyword);
    return response.data;
}
