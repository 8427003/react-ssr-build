import React, { Component } from 'react';
import { Switch, Route, Redirect, StaticRouter as Router } from 'react-router';
import Loadable from './loadable.js';
import routerList from '../config/router';
import './index.less';

const routers = routerList.filter(item => {
    return item.type !== 'Redirect'
})

const Loading = ({pastDelay}) => {
    if (pastDelay) {
        return <div className="p-loading"><div className="lds-dual-ring"></div></div>
    }
    return null;
}

const routeList = routers.map(item => {
    let props = {
        key: item.path,
        path: item.path,
        component: Loadable({
            loader: item.component
        }),
    }

    return <Route {...props} />
});

export default function () {
    console.log('app Route entry=================')

    return (
        <Router location='/rules'>
            <Switch>
                {routeList}
            </Switch>
        </Router>
    )
}
//
//export default function () {
    //return (<div>1222222222222</div>)
//}
