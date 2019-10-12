import React, { useEffect, useState } from 'react';

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

    const init = () => {
        return new Promise((resolve, reject) => {
            if(!res) {
                res = {
                    loaderRes: loaderConfig.loader._mm(),
                }
            }
            if(res.loaderRes instanceof Promise) {
                res.loaderRes.then(m => {
                    res.component = resolveModule(m);
                    resolve(res);
                })
            }
            else {
                res.component = resolveModule(res.loaderRes);
                resolve(res);
            }
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
            init();
        }
        componentDidMount() {
            if(!res.component) {
                res.loaderRes.then(() => {
                    console.log('Loadable update....')
                    this.forceUpdate();
                })
            }
        }
        render() {
            if(res.component) {
                const PageComponent = res.component;
                return <PageComponent />
            }
            return null;
        }
    }
}

Loadable.loadReady = function () {
    let plSize = PAGE_LOADERS.length;
    const allPromises = [];

    console.log('page loaders total: ', plSize);

    while(plSize--) {
        const { loaderConfig, init } = PAGE_LOADERS.pop();
        // 获得moduleId
        let moduleId = null;
        if(typeof loaderConfig.loader._pp === 'undefined') continue;
        moduleId = loaderConfig.loader._pp();
        if(!moduleId) continue;

        // 判断module是否已经加载
        console.log(moduleId, ' isModuleLoaded: ', isModuleLoaded(moduleId), );
        if(!isModuleLoaded(moduleId)) continue;

        allPromises.push(init());
    }

    console.log('page loaders loadReady count:', allPromises.length);

    if(allPromises.length > 0) {
        return Promise.all(allPromises)
    }

    return Promise.resolve();
}

export default Loadable;
