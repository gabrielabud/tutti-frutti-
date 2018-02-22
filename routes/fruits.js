var express       = require('express');
var router        = express.Router();
const scrapePage  = require('../controllers/scrapers');
const Fruit       = require('../models/fruits');

router.post('/new', (req, res) => {
  let productPages = [
    // {
    //   category : "Apples and Pears",
    //   uri      : "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/apples-pears-29/"
    // },
    // {
    //   category : "Bananas",
    //   uri      : "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/bananas-30/"
    // },
    {
      category : "Citrus Fruits",
      uri      : "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/citrus-fruits-40/"
    }
  ]
  productPages.forEach(page => scrapePage(page.category, page.uri));
  res.status(200).send('Save successful')
})

router.get('/', (req, res) => {
  Fruit.find({}, (err, searchResults) => {
    if (err) throw err;
      res.status(200).send(searchResults)
    })
})

module.exports = router;