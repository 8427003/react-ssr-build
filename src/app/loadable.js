import React, { useEffect, useState } from 'react';
import { matchPath } from 'react-router';

const PAGE_LOADERS = [];

function isModuleLoaded(moduleId) {
    if (typeof __webpack_modules__ !== "object") {
        return false;
    }
    return (
        typeof moduleId !== "undefined" &&
        typeof __webpack_modules__[moduleId] !== "undefined"
    );
}


function resolveModule(obj) {
    return obj && obj.__esModule ? obj.default : obj;
}


function Loadable(loaderConfig) {

    let res = null;

    const init = (match) => {
        return new Promise((resolve, reject) => {
            if(!res) {
                res = {
                    loaderRes: loaderConfig.loader._mm(),
                }
            }
            if(!(res.loaderRes instanceof Promise)) {
                res.loaderRes = Promise.resolve(res.loaderRes);

            }
            res.loaderRes.then(m => {
                res.component = resolveModule(m);
                if(typeof res.component.getInitialProps === 'function') {
                    let initProps = res.component.getInitialProps({ match });
                    if(!(initProps instanceof Promise)) {
                        initProps = Promise.resolve(initProps)
                    }
                    return initProps;
                }
            })
            .then(initProps => {
                res.initProps = initProps;
                resolve(res);
            })
            .catch(error => {
                console.error(error);
                resolve(res);
            })
        })
    }
    console.log('add page loader................')
    PAGE_LOADERS.push({
        loaderConfig,
        init,
    });

    return class LoadableComponent extends React.Component {
        constructor(props) {
            super(props);
            this.initRes = init();
        }
        componentDidMount() {
            if(!res.component && this.initRes) {
                this.initRes.then(() => {
                    console.log('Loadable update....')
                    this.forceUpdate();
                })
            }
        }
        render() {
            console.log('second..............................')
            if(res.component) {
                const { component: Component, initProps } = res;

                return loaderConfig.render ? loaderConfig.render({
                    Component,
                    initProps,
                    props: this.props,
                }) : <Component initProps={initProps} {...this.props} />
            }
            return null;
        }
    }
}

Loadable.loadReady = function (url) {
    let plSize = PAGE_LOADERS.length;
    let loaderConfig = null;
    let init = null;
    let match = null;

    console.log('page loaders total: ', plSize);

    while(plSize--) {
        const pageLoader = PAGE_LOADERS.pop();
        loaderConfig = pageLoader.loaderConfig;
        init = pageLoader.init;

        const match = matchPath(url, {
            path: loaderConfig.path
        })

        if(match) {
            break;
        }
    }

    if(typeof init === 'function') {
        return init(match)
    }

    return Promise.reject('no macth');
}

//Loadable.loadReady = function () {
    //let plSize = PAGE_LOADERS.length;
    //const allPromises = [];

    //console.log('page loaders total: ', plSize);

    //while(plSize--) {
        //const { loaderConfig, init } = PAGE_LOADERS.pop();
        //// 获得moduleId
        //let moduleId = null;
        //if(typeof loaderConfig.loader._pp === 'undefined') continue;
        //moduleId = loaderConfig.loader._pp();
        //if(!moduleId) continue;

        //// 判断module是否已经加载
        //console.log(moduleId, ' isModuleLoaded: ', isModuleLoaded(moduleId));
        //if(!isModuleLoaded(moduleId)) continue;

        //allPromises.push(init());
    //}

    //console.log('page loaders loadReady count:', allPromises.length);

    //if(allPromises.length > 0) {
        //return Promise.all(allPromises)
    //}

    //return Promise.resolve();
//}

export default Loadable;
