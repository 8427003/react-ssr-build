const express = require('express');
const App = require('../dist2/ssr-app.js');
const React = App.React;
const ReactDOMServer = App.ReactDOMServer;
const loadReady = App.loadReady;

const stats = require('./app/stats.js');
const statsJson = require('../dist/stats.json');
const initedStats = stats.initStats(statsJson);

const app = express();

app.use(express.static('../dist'))


app.get('/rules', async (req, res) => {
    const r = await loadReady(req.path);

    res.send(`
    <!doctype html>
    <html lang="en">
        <head>
            ${stats.getAssetsXMLString(initedStats, r.requestText).css}
        </head>
        <body>
            <div id="root">${ReactDOMServer.renderToString(React.createElement(App.default))}</div>
            <script>window.isSSR=true;</script>
            ${stats.getAssetsXMLString(initedStats, r.requestText).js}
            <script>window.main();</script>
        </body>
    </html>
  `);
});

app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});
