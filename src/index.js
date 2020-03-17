import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import config from './config/env';
import App from './app/index';
import Loadable from './app/loadable.js';
const { loadReady } = Loadable;


// 如果设置有环境变量，则根据环境变量NODE_PROFILE改变baseURL
const NODE_PROFILE = process && process.env && process.env.NODE_PROFILE;
if(config[NODE_PROFILE] && config[NODE_PROFILE].baseURL) {
    axios.defaults.baseURL = config[NODE_PROFILE].baseURL;
    axios.defaults.withCredentials = true;
}

// 是前端
if(typeof window !== 'undefined') {
    if(window.isSSR) {
        window.main = function (playload) {
            console.log('=========main playload:', playload);
            Loadable.loadReady(playload.path, playload.initProps).then(() => {
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
}

export {
    App,
    loadReady,
    React,
    ReactDOM,
    ReactDOMServer
}
