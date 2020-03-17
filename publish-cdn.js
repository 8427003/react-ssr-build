/**
 * @overview
 *
 * @author
 * @version 2018/07/08
 */

const uploadCDN = require('upload-cdn');


const SSO_CONFIG = {
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIbBEr35HWFMuJ',
    accessKeySecret: 'tXHajyq8JEqcQ67RCX6RUZJQINjvK4',
    bucket: 'websiteh5'
}

uploadCDN(SSO_CONFIG, {
    namespace: 'ssr-test/static',
    uploadDir: './dist/static'
})
