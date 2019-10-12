const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
//const StaticRouter = require("react-router").StaticRouter
//const statsData = require('../compilation-stats.json');
const App = require('../dist2/ssr-app.js');

console.log(App);
const app = express();

app.use(express.static('../dist'))
//app.static('../dist');

app.get('/aa', (req, res) => {
    res.send(`
    <!doctype html>
    <html lang="en">
        <head>
            <link href="/static/css/main.db98c70b.css" rel="stylesheet">
            <link href="/static/css/0.17b73fe1.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${ReactDOMServer.renderToString(React.createElement(App.default))}</div>
            <script src="/ssr-app.js"></script>
            <script src="/0.ssr-app.js"></script>
            <script>window.main();</script>
        </body>
    </html>
  `);
});

app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});
