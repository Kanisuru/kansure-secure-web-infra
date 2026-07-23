const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const version = process.env.APP_VERSION || 'v1';

app.get('/', (req, res) => {
    res.send(`Hello from Kansure Web App - ${version}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});