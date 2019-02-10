"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_driver_1 = __importDefault(require("./axios-driver"));
const puppeteer_driver_1 = __importDefault(require("./puppeteer-driver"));
const filters = {
    noNewLine(value) {
        return typeof value === 'string' ? value.replace('\n', '') : value;
    },
    trim(value) {
        return typeof value === 'string' ? value.replace('\n', '').trim() : value;
    },
    reverse(value) {
        return typeof value === 'string' ? value.split('').reverse().join('') : value;
    },
    slice(value, start, end) {
        return typeof value === 'string' ? value.slice(start, end) : value;
    },
};
const xRayUtils = {
    puppeteerDriver: puppeteer_driver_1.default,
    axiosDriver: axios_driver_1.default,
    filters
};
exports.default = xRayUtils;
