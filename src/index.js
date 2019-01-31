const x = require('./wrappers/x-ray')
const axios = require('./wrappers/axios')

const Proxy = require('./utils/proxy')

const proxy = new Proxy()

module.exports = {
    x,
    axios,
    setProxyUrl:proxy.setProxyUrl
};
