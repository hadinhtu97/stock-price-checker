'use strict';

const StockChecker = require('../controllers/stockChecker.js')

module.exports = (app) => {

    let stockChecker = new StockChecker()

    app.route('/api/stock-prices')
        .get((req, res) => {
            if (typeof req.query.stock == 'string') {
                stockChecker.getStockFromServer(req.query.stock)
                    .then(stockObj => {
                        let price = stockObj.latestPrice;
                        stockChecker.findStockFromDB(req.query.stock)
                            .then(stock => {
                                if (stock == null) {
                                    stockChecker.createStockToDB(req.query.stock)
                                        .then(stock => {
                                            res.json({
                                                'stockData': {
                                                    'stock': req.query.stock,
                                                    'price': price,
                                                    'like': stock.like_count
                                                }
                                            })
                                        })
                                        .catch(err => {
                                            res.json(err)
                                        })
                                } else {
                                    if (req.query.like && stock.ip.indexOf(req.ip) == -1) {
                                        stockChecker.updateStockToDB(req.query.stock, req.ip)
                                            .then(stock => {
                                                res.json({
                                                    'stockData': {
                                                        'stock': req.query.stock,
                                                        'price': price,
                                                        'like': stock.like_count
                                                    }
                                                })
                                            })
                                            .catch(err => {
                                                res.json(err);
                                            })
                                    } else {
                                        res.json({
                                            'stockData': {
                                                'stock': req.query.stock,
                                                'price': price,
                                                'like': stock.like_count
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