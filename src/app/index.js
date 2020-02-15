import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
//import { Switch, Route, HashRouter as Router } from 'react-router';
import { Switch, Route, StaticRouter as Router } from 'react-router-dom';
import Loadable from './loadable.js';
import routerList from '../config/router';
import './index.less';

const { loadReady } = Loadable;

let routeList = routerList.filter(item => item.type !== 'Redirect').map(item => {
    let props = {
        key: item.path,
        path: item.path,
        component: Loadable({
            path: item.path,
            loader: item.component,
        }),
    }

    return <Route {...props} />
});

export default function (props) {
    console.log('================app Router entry=================')

    return (
        <Router location='/rules?xxx=1'>
            <Switch>
                {routeList}
            </Switch>
        </Router>
    )
}
export {
    loadReady,
    React,
    ReactDOM,
    ReactDOMServer
}
