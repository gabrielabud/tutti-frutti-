const rp        = require('request-promise');
const Promise   = require('bluebird');
const cheerio   = require('cheerio');
const saveOrUpdateFruit = require('./fruits');

const scrapePage = (page, categoryId) => {
  let options = {
    uri: page.uri,
    transform: (body) => {
      return cheerio.load(body);
    }
  }
  rp(options)
    .then(($) => {
      var productNames  = $('.tailor-made-product-name').toArray();
      var productPrices = $('.tailor-made-product-price-box').toArray();
      return Promise.map(productNames, async (item, i) => {
        let itemName  = item.children[0].data.trim();
        let itemPrice = productPrices[i].children[0].data.trim().replace(/£/, '');
        await saveOrUpdateFruit(itemName, itemPrice, categoryId)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = scrapePage;