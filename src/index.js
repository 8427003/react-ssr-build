import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import config from './config/env';
import App from './app/index';
import Loadable from './app/loadable.js';

// 如果设置有环境变量，则根据环境变量NODE_PROFILE改变baseURL
const NODE_PROFILE = process && process.env && process.env.NODE_PROFILE;
if(config[NODE_PROFILE] && config[NODE_PROFILE].baseURL) {
    axios.defaults.baseURL = config[NODE_PROFILE].baseURL;
    axios.defaults.withCredentials = true;
}

if(window.isSSR) {
    window.main = function () {
        Loadable.loadReady('/rules').then(() => {
            console.log('====================loadReady done====================');

            ReactDOM.hydrate(
                <App />,
                document.getElementById('root')
            );
        })
    }
}
else {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}

