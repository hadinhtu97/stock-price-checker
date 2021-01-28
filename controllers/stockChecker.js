'use strict';

const StockModel = require('../models/stockModel.js');
const fetch = require('node-fetch');

function StockChecker() {

    this.getStockFromServer = async (stockName) => {
        let url = this.getUrl(stockName);
        let res = await fetch(url);
        return await res.json();
    }

    this.findStockFromDB = async (stockName) => {
        return await StockModel.findOne({ name: stockName });
    }

    this.createStockToDB = async (stockName) => {
        let stock = new StockModel({
            name: stockName,
            like_count: 0,
            ip: []
        });
        return await stock.save();
    }

    this.updateStockToDB = async (stockName, ip) => {
        return await StockModel.findOneAndUpdate(
            { name: stockName },
            {
                $inc: { like_count: 1 },
                $push: { ip: ip }
            },
            { new: true }
        )
    }

    this.getUrl = stockName => {
        return 'https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/' + stockName + '/quote';
    }

}

module.exports = StockChecker