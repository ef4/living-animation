/* eslint-env node */
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = async function urls(distDir, visit) {
  let output = [];
  let page = await visit('/slide-map');
  if (page.statusCode !== 200) {
    throw new Error("can't find slide map");
  }
  let html = await page.html();
  let dom = new JSDOM(html);
  for (let aTag of [...dom.window.document.querySelectorAll('a')]) {
    if (aTag.href) {
      output.push(aTag.href);
    }
  }
  return output;
};
