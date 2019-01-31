const Xray = require('x-ray');
const axiosDriver = require('../utils/x-ray-axios-driver');

const x = Xray();
x.driver(axiosDriver()); // Set driver



module.exports = {
    x,
}