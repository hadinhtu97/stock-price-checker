'use strict';

const StockChecker = require('../controllers/stockChecker.js')

module.exports = (app) => {

    let stockChecker = new StockChecker()

    app.route('/api/stock-prices')
        .get((req, res) => {
            if (typeof req.query.stock == 'string') {
                let stockName = req.query.stock.toUpperCase();
                stockChecker.getStockFromServer(stockName)
                    .then(stockObj => {
                        let price = stockObj.latestPrice;
                        stockChecker.findStockFromDB(stockName)
                            .then(stock => {
                                if (stock == null) {
                                    stockChecker.createStockToDB(stockName)
                                        .then(stock => {
                                            res.json({
                                                'stockData': {
                                                    'stock': stockName,
                                                    'price': price,
                                                    'likes': stock.like_count
                                                }
                                            })
                                        })
                                        .catch(err => {
                                            res.json(err)
                                        })
                                } else {
                                    if (req.query.like && stock.ip.indexOf(req.ip) == -1) {
                                        stockChecker.updateStockToDB(stockName, req.ip)
                                            .then(stock => {
                                                res.json({
                                                    'stockData': {
                                                        'stock': stockName,
                                                        'price': price,
                                                        'likes': stock.like_count
                                                    }
                                                })
                                            })
                                            .catch(err => {
                                                res.json(err);
                                            })
                                    } else {
                                        res.json({
                                            'stockData': {
                                                'stock': stockName,
                                                'price': price,
                                                'likes': stock.like_count
                                            }
                                        })
                                    }
                                }
                            })
                            .catch(err => {
                                res.json(err);
                            })
                    })
                    .catch(err => {
                        res.json(err)
                    })
            } else {
                console.log('b');
            }

        });

}