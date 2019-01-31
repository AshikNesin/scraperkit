const {x} = require('./wrappers/x-ray')
const axios = require('./wrappers/axios')
import { setProxyUrl } from "./utils/proxy";


module.exports = {
    x,
    axios,
    setProxyUrl
};
