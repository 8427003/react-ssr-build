/**
 * @overview
 *
 * @author 
 * @version 2020/02/22
 */

var html = `
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover">
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<title>知否</title>
<style>
html {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}
body {
    background-color: #fff;
    -webkit-tap-highlight-color: transparent;
}
</style>
<link rel="dns-prefetch" href="//dss1.bdstatic.com">
<link href="//s2.tystatic.cn/ssr-test/static/css/main.f2cafe5c.css" rel="stylesheet"></head>
<body class="app">
    <div id="root"></div>
<script type="text/javascript" src="//s2.tystatic.cn/ssr-test/static/js/main.e1b253062222222222.js"></script>
<script type="text/javascript" src="//s2.tystatic.cn/ssr-test/static/js/main.e1b25306.js"></script></body>
</html>
`

const tpl =  html.replace(/(<script.*?>([\s\S]*?)<\/script>)|(<link.*?rel="stylesheet".*?\/?>)/img, '')
                .replace(/<\/body>/img, "${this.jsTpl}</body>")
                .replace(/<\/head>/img, "${this.cssTpl}</head>")



const fillTemplate = function(templateString, templateVars){
    return new Function("return `"+templateString +"`;").call(templateVars);
}
const x = fillTemplate(tpl, {jsTpl: '1111111111111111', cssTpl: '22222222222222222'});
console.log(x);
