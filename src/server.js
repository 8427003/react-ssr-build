const path = require('path');
const express = require('express');
const ssr = require('@sukbta/ssr-express-middleware');

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('/p/*', ssr({ root: path.resolve(__dirname, '../dist') }));

app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});

//  这是最简单的服务端项目
