const config = {
    DEV: {
        api: 'http://localhost:3000'
    },
    PROD: {
        api: 'https://ux8w46p3f9.execute-api.us-east-1.amazonaws.com/dev'
    }
};

export default config[process.env.REACT_APP_STAGE || 'DEV'];
