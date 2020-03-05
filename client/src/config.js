const config = {
    DEV: {
        api: 'http://127.0.0.1:8000'
    },
    PROD: {
        api: 'https://ux8w46p3f9.execute-api.us-east-1.amazonaws.com/dev'
    }
};

export default config[process.env.REACT_APP_STAGE || 'DEV'];
