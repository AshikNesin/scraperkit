"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_from_selectors_1 = require("./scrappers/content-from-selectors");
const html_content_1 = __importDefault(require("./scrappers/html-content"));
const x_ray_1 = __importDefault(require("./utils/x-ray"));
const aws_1 = __importDefault(require("./utils/aws"));
module.exports = {
    getHTMLContent: html_content_1.default,
    getContentFromSelectors: content_from_selectors_1.getContentFromSelectors,
    xRayUtils: x_ray_1.default,
    awsUtils: aws_1.default
};
