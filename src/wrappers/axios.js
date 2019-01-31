const axios = require('axios');
const httpsProxyAgent = require('https-proxy-agent');
const {getProxyUrl} = require('../utils/proxy')

axios.interceptors.request.use(config =>
    new Promise((resolve, reject) => {
        const newConfig = Object.assign({}, config);
        console.log('inside interceptors')
        console.log({proxyUrl:getProxyUrl()})
        if(getProxyUrl()){
            const agent = new httpsProxyAgent(getProxyUrl());
            newConfig.httpsAgent = agent;
            resolve(newConfig);
        }
        resolve(config);
    })
)

module.exports = axios;