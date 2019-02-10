"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_from_selectors_1 = require("./scrappers/content-from-selectors");
const x_ray_1 = __importDefault(require("./utils/x-ray"));
const aws_sqs_1 = __importDefault(require("./utils/aws-sqs"));
module.exports = {
    getContentFromSelectors: content_from_selectors_1.getContentFromSelectors,
    xRayUtils: x_ray_1.default,
    awsSQSUtils: aws_sqs_1.default
};