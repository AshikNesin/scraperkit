"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Xray = require('x-ray');
const axiosDriver = require('../utils/x-ray-axios-driver');
exports.x = Xray();
exports.x.driver(axiosDriver()); // Set driver
