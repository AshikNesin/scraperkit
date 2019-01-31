const Xray = require('x-ray');
const axiosDriver = require('../utils/x-ray-axios-driver');
// const puppeteerDriver = require('../utils/x-ray-puppeteer-driver');
// set some options for the Puppeteer instance
// const puppeteerOptions = {
//     headless: true,
//     // In order to persist session info, you need to designate a userDataDir.
//     // Note that this folder can get large,
//     // so consider adding it to .gitignore
//     // userDataDir: './USER_SESSION/'
// };

const x = Xray();
x.driver(axiosDriver()); // Set driver

// const xp = Xray();
// xp.driver(puppeteerDriver(
//     puppeteerOptions,
//     undefined, // <- see index.js for comments, but this basically is just an override for using Puppeteer in this driver.
//     )); // Set driver

module.exports = {
    x,
    // xp
}