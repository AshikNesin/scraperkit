"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const debug = require('debug')('scraperkit');
exports.axiosDriver = (opts = {}) => {
    debug({ opts });
    return function driver(context, callback) {
        const url = context.url;
        axios.get(url).then(({ data }) => {
            const body = data;
            return callback(null, body);
        }).catch((err) => callback(err, null));
    };
};
exports.default = exports.axiosDriver;
