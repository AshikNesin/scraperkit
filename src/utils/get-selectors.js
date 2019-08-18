const cheerio = require('cheerio');

const getSelectors = (htmlContent = null, selectors = []) => {
    const $ = cheerio.load(htmlContent);
    const result = {};
    selectors.map(selector => {
        result[selector] = null;
        const $$ = $(selector);
        if ($$.length) {
            result[selector] = [];
            $(selector).map(function(i, el) {
                // this === el
                result[selector].push({
                    text: $(el)
                        .text()
                        .trim().length
                        ? $(el)
                              .text()
                              .trim()
                        : null,
                    attrs: el.attribs
                });
            });
        }
    });
    return result;
};

module.exports = getSelectors;
