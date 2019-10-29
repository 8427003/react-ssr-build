module.exports = function(source) {
    source = source.replace(/require/ig, 'console.log');;
    source = source.replace(/import/ig, 'var a = ');;
    return source;
}
