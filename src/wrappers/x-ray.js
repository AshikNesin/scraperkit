const Xray = require('x-ray');
const requestDriver = require('./../utils/request-driver');
const {getProxyUrl, proxyUrl} = require('./../utils/proxy');

// let proxy = getProxyUrl();
module.exports = (() => {
    // console.log({proxyUrl})
    const x = Xray();
    // const getDriverConfig = () => {
    //     console.log({proxy: proxy})
    //     if(proxy){
    //         return {
    //             proxy:proxy
    //         }
    //     }
    //     return {}
    // }
    const driver = requestDriver(); // Create driver
    x.driver(driver); // Set driver
    return x;
})()