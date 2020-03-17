const path = require('path');
const express = require('express');
const ssr = require('./app/ssr.middleware.js');

const app = express();

app.get('/p/*', ssr({ root: path.resolve(__dirname, '../dist') }));

app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});
