'use strict';

const StockModel = require('../models/stockModel.js');
const fetch = require('node-fetch');

function StockChecker() {

    this.getStockPrice = async (stock) => {
        let url = 'https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/' + stock + '/quote';
        let response = await fetch(url);
        let res = await response.json();
        return res.latestPrice
    }

}

module.exports = StockChecker