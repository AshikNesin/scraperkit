import xRayAxiosDriver  from "./axios-driver";
import xRayPuppeteerDriver  from "./puppeteer-driver";

const filters = {
    noNewLine(value:any) {
		return typeof value === 'string' ? value.replace('\n', '') : value;
	},
	trim(value:any) {
		return typeof value === 'string' ? value.replace('\n', '').trim() : value;
	},
	reverse(value:any) {
		return typeof value === 'string' ? value.split('').reverse().join('') : value;
	},
	slice(value:any, start:number, end:number) {
		return typeof value === 'string' ? value.slice(start, end) : value;
	},
};

const xRayUtils = {
    puppeteerDriver:xRayPuppeteerDriver,
    axiosDriver:xRayAxiosDriver,
    filters
}

export default xRayUtils