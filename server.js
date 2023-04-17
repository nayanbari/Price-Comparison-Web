const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(express.static('public'));
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/price', async (req, res) => {
  const { q } = req.query;
  try {
    const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(q)}`;
    const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`;
    
    const amazonResponse = await axios.get(amazonUrl);
    const flipkartResponse = await axios.get(flipkartUrl);

    const amazonData = getAmazonData(amazonResponse.data);
    const flipkartData = getFlipkartData(flipkartResponse.data);
    // console.log(amazonData)
    res.send({
      amazon: amazonData,
      flipkart: flipkartData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

function getAmazonData(html) {
  const $ = cheerio.load(html);
  const productList = $('.s-result-list').children();
  const productData = [];

  productList.each((i, el) => {
    const name = $(el).find('.a-text-normal').text();
    const price = $(el).find('.a-offscreen').text();

    if (name && price) {
      productData.push({
        name: name.trim(),
        price: price.trim()
      });
    }
  });

  return productData;
}

function getFlipkartData(html) {
  const $ = cheerio.load(html);
  const productList = $('._2kHMtA').children();
  const productData = [];

  productList.each((i, el) => {
    const name = $(el).find('._4rR01T').text();
    const price = $(el).find('._30jeq3._1_WHN1').text();

    if (name && price) {
      productData.push({
        name: name.trim(),
        price: price.trim()
      });
    }
  });

  return productData;
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
