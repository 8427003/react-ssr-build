function isCssFile(asset) {
    if(!asset) return;
    return (asset.length - '.css'.length) === asset.lastIndexOf('.css');
}

function isJsFile(asset) {
    if(!asset) return;
    return (asset.length - '.js'.length) === asset.lastIndexOf('.js');
}

function initStats(stats) {
    const { chunks, entrypoints } = stats;

    if(!chunks || !entrypoints) {
        console.error('in stats, chunks and entrypoints required!');
        return;
    }

    // init request assets
    const assetsByRequest = {};
    chunks.forEach(item => {
        if(!item.initial && !item.entry) {
            const cssFiles = [];
            const jsFiles = [];

            item.files.forEach(file => {
                if(isJsFile(file)) {
                    jsFiles.push(file);
                }
                else if(isCssFile(file)) {
                    cssFiles.push(file);
                }
            })

            item.origins.forEach(origin => {
                const key = origin.request + origin.moduleId;
                if(!assetsByRequest[key]) {
                    assetsByRequest[key] = {
                        css: [],
                        js: [],
                    };
                }
                [].push.apply(assetsByRequest[key].css, cssFiles);
                [].push.apply(assetsByRequest[key].js, jsFiles);
            })
        }
    })

    // init 'initial and entry' assests;
    const assetsByEntry = {};
    Object.keys(entrypoints).forEach(entryKey => {
        const entry = entrypoints[entryKey];

        if(!assetsByEntry[entryKey]) {
            assetsByEntry[entryKey] = {
                css: [],
                js: []
            }
        }
        (entry.assets || []).forEach(asset => {
            if(!asset) return;
            // css file
            if(isCssFile(asset)) {
                assetsByEntry[entryKey].css.push(asset);
            }
            // js file
            else if(isJsFile(asset)) {
                assetsByEntry[entryKey].js.push(asset);
            }
        })
    })

    return {
        assetsByEntry,
        assetsByRequest
    }
}

function getAssets(initedStats, requestText, entryPoint = 'main') {
    if(!initedStats || (initedStats && (!initedStats.assetsByEntry || !initedStats.assetsByRequest))) {
        console.error('initedStats has some exception!:', initedStats);
        return;
    }

    let requestAssets = null;
    if(requestText) {
        Object.keys(initedStats.assetsByRequest).some(key => {
            if(0 === key.indexOf(requestText)) {
                requestAssets = initedStats.assetsByRequest[key];
                return;
            }
        })
    }
    const entryAssets = initedStats.assetsByEntry[entryPoint];

    if(!entryAssets) {
        console.warn(`entryPoint ${entryPoint}, assets not found!`);
    }
    if(!requestAssets) {
        console.warn(`request: ${requestText}, assets not found!`);
    }

    return {
        cssFiles: [].concat(entryAssets ? entryAssets.css : [], requestAssets ? requestAssets.css : []),
        jsFiles: [].concat(entryAssets ? entryAssets.js: [], requestAssets ? requestAssets.js: []),
    }
}

function getAssetsXMLString(initedStats, requestText, entryPoint='main') {
    const assets = getAssets(initedStats, requestText, entryPoint);

    return {
        js: assets.jsFiles.map(item => '<script src="'+item+'"></script>').join(''),
        css: assets.cssFiles.map(item => '<link href="'+item+'" rel="stylesheet" />').join('')
    }
}

module.exports = {
    initStats,
    getAssets,
    getAssetsXMLString,
}
