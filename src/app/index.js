import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Switch, Route, StaticRouter, BrowserRouter } from 'react-router-dom';
import Loadable from '@sukbta/ssr-react-loadable';
import routerList from '../config/router';
import './index.less';


// 重要1，在服务端渲染下，用staticRouter，location 传path 进去。
// 在浏览器里，用browserRouter，不传location。
const Router = (typeof window !== 'undefined') ? BrowserRouter : StaticRouter;

let routeList = routerList.filter(item => item.type !== 'Redirect').map(item => {
    let props = {
        key: item.path,
        path: item.path,
        component: Loadable({
            path: item.path,
            loader: item.component
        })
    }
    return <Route {...props} />
});


export default function (props) {
    console.log('==========app Router entry==========')
    return (
        <Router {...(props.routerProps || {})}>
            <Switch>
                {routeList}
            </Switch>
        </Router>
    )
}
