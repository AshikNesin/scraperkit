const Xray = require('x-ray');
const axiosDriver = require('../utils/x-ray-axios-driver');

export const x = Xray();
x.driver(axiosDriver()); // Set driver
