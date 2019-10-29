const express = require('express');
//const StaticRouter = require("react-router").StaticRouter
//const statsData = require('../compilation-stats.json');
const App = require('../dist2/ssr-app.js');
const React = App.React;
console.log(App);
const ReactDOMServer = App.ReactDOMServer;
const loadReady = App.loadReady;

const app = express();

app.use(express.static('../dist'))

app.get('/rules', async (req, res) => {
    const r = await loadReady('/rules');
    console.log('match===============', r);

    res.send(`
    <!doctype html>
    <html lang="en">
        <head>
            <link href="/static/css/main.db98c70b.css" rel="stylesheet">
            <link href="/static/css/0.17b73fe1.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${ReactDOMServer.renderToString(React.createElement(App.default))}</div>
            <script>window.isSSR=true;</script>
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
