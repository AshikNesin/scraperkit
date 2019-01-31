const {x} = require('./wrappers/x-ray')
const axios = require('./wrappers/axios')

const {
    setProxyUrl,
} = require('./utils/proxy')


module.exports = {
    x,
    axios,
    setProxyUrl
};
