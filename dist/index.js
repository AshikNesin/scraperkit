"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_html_1 = __importDefault(require("./utils/get-html"));
const get_selectors_1 = __importDefault(require("./utils/get-selectors"));
module.exports = {
    getHTML: get_html_1.default,
    getSelectors: get_selectors_1.default
};
