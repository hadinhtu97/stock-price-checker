'use strict';

const StockChecker = require('../controllers/stockChecker.js')

// Note : i know 'promise hell' what look like

module.exports = (app) => {

    let stockChecker = new StockChecker()

    app.route('/api/stock-prices')
        .get((req, res) => {
            if (typeof req.query.stock == 'string') {
                // 1 stock

                // upper case stock name, eg: GOOG, MSFT
                let stockName = req.query.stock.toUpperCase();
                // Get full infomation of stock by stock name via FCC server
                stockChecker.getStockFromServer(stockName)
                    .then(stockObj => {
                        // The latest price provied by server
                        let price = stockObj.latestPrice;
                        // Find this stock in my db
                        stockChecker.findStockFromDB(stockName)
                            .then(stock => {
                                // When stock is not available in db
                                if (stock == null) {
                                    // create a new document then response to user
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
                                    // When stock is available in db
                                    // Check: is user like this stock and this is the first like (1 ip can like 1 time)
                                    if (req.query.like && stock.ip.indexOf(req.ip) == -1) {
                                        // when user do not like yet, update to db and response
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
                                        // when user do not like or liked, response
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
                // 2 stock : same with 1 stock, do 2 times
                let stockName1 = req.query.stock[0].toUpperCase();
                let stockName2 = req.query.stock[1].toUpperCase();
                stockChecker.getStockFromServer(stockName1)
                    .then(stockObj1 => {
                        let price1 = stockObj1.latestPrice;
                        stockChecker.getStockFromServer(stockName2)
                            .then(stockObj2 => {
                                let price2 = stockObj2.latestPrice;
                                stockChecker.findStockFromDB(stockName1)
                                    .then(stock1 => {
                                        stockChecker.findStockFromDB(stockName2)
                                            .then(stock2 => {
                                                if (stock1 == null && stock2 == null) {
                                                    stockChecker.createStockToDB(stockName1)
                                                        .then(stock1 => {
                                                            stockChecker.createStockToDB(stockName2)
                                                                .then(stock2 => {
                                                                    res.json({
                                                                        'stockData': [
                                                                            {
                                                                                'stock': stockName1,
                                                                                'price': price1,
                                                                                'rel_likes': stock1.like_count - stock2.like_count
                                                                            },
                                                                            {
                                                                                'stock': stockName2,
                                                                                'price': price2,
                                                                                'rel_likes': stock2.like_count - stock1.like_count
                                                                            }
                                                                        ]
                                                                    });
                                                                })
                                                                .catch(err => {
                                                                    res.json(err)
                                                                })
                                                        })
                                                        .catch(err => {
                                                            res.json(err);
                                                        })
                                                } else if (stock1 == null) {
                                                    stockChecker.createStockToDB(stockName1)
                                                        .then(stock1 => {
                                                            if (req.query.like && stock2.ip.indexOf(req.ip) == -1) {
                                                                stockChecker.updateStockToDB(stockName2, req.ip)
                                                                    .then(stock2 => {
                                                                        res.json({
                                                                            'stockData': [
                                                                                {
                                                                                    'stock': stockName1,
                                                                                    'price': price1,
                                                                                    'rel_likes': stock1.like_count - stock2.like_count
                                                                                },
                                                                                {
                                                                                    'stock': stockName2,
                                                                                    'price': price2,
                                                                                    'rel_likes': stock2.like_count - stock1.like_count
                                                                                }
                                                                            ]
                                                                        })
                                                                    })
                                                                    .catch(err => {
                                                                        res.json(err);
                                                                    })
                                                            } else {
                                                                res.json({
                                                                    'stockData': [
                                                                        {
                                                                            'stock': stockName1,
                                                                            'price': price1,
                                                                            'rel_likes': stock1.like_count - stock2.like_count
                                                                        },
                                                                        {
                                                                            'stock': stockName2,
                                                                            'price': price2,
                                                                            'rel_likes': stock2.like_count - stock1.like_count
                                                                        }
                                                                    ]
                                                                })
                                                            }
                                                        })
                                                        .catch(err => {
                                                            res.json(err);
                                                        })
                                                } else if (stock2 == null) {
                                                    stockChecker.createStockToDB(stockName2)
                                                        .then(stock2 => {
                                                            if (req.query.like && stock1.ip.indexOf(req.ip) == -1) {
                                                                stockChecker.updateStockToDB(stockName1, req.ip)
                                                                    .then(stock1 => {
                                                                        res.json({
                                                                            'stockData': [
                                                                                {
                                                                                    'stock': stockName1,
                                                                                    'price': price1,
                                                                                    'rel_likes': stock1.like_count - stock2.like_count
                                                                                },
                                                                                {
                                                                                    'stock': stockName2,
                                                                                    'price': price2,
                                                                                    'rel_likes': stock2.like_count - stock1.like_count
                                                                                }
                                                                            ]
                                                                        })
                                                                    })
                                                                    .catch(err => {
                                                                        res.json(err);
                                                                    })
                                                            } else {
                                                                res.json({
                                                                    'stockData': [
                                                                        {
                                                                            'stock': stockName1,
                                                                            'price': price1,
                                                                            'rel_likes': stock1.like_count - stock2.like_count
                                                                        },
                                                                        {
                                                                            'stock': stockName2,
                                                                            'price': price2,
                                                                            'rel_likes': stock2.like_count - stock1.like_count
                                                                        }
                                                                    ]
                                                                })
                                                            }
                                                        })
                                                        .catch(err => {
                                                            res.json(err);
                                                        })
                                                } else {
                                                    if (req.query.like && stock1.ip.indexOf(req.ip) == -1 && stock2.ip.indexOf(req.ip) == -1) {
                                                        stockChecker.updateStockToDB(stockName1, req.ip)
                                                            .then(stock1 => {
                                                                stockChecker.updateStockToDB(stockName2, req.ip)
                                                                    .then(stock2 => {
                                                                        res.json({
                                                                            'stockData': [
                                                                                {
                                                                                    'stock': stockName1,
                                                                                    'price': price1,
                                                                                    'rel_likes': stock1.like_count - stock2.like_count
                                                                                },
                                                                                {
                                                                                    'stock': stockName2,
                                                                                    'price': price2,
                                                                                    'rel_likes': stock2.like_count - stock1.like_count
                                                                                }
                                                                            ]
                                                                        })
                                                                    })
                                                                    .catch(err => {
                                                                        res.json(err);
                                                                    })
                                                            })
                                                            .catch(err => {
                                                                res.json(err);
                                                            })
                                                    } else if (req.query.like && stock1.ip.indexOf(req.ip) == -1) {
                                                        stockChecker.updateStockToDB(stockName1, req.ip)
                                                            .then(stock1 => {
                                                                res.json({
                                                                    'stockData': [
                                                                        {
                                                                            'stock': stockName1,
                                                                            'price': price1,
                                                                            'rel_likes': stock1.like_count - stock2.like_count
                                                                        },
                                                                        {
                                                                            'stock': stockName2,
                                                                            'price': price2,
                                                                            'rel_likes': stock2.like_count - stock1.like_count
                                                                        }
                                                                    ]
                                                                })
                                                            })
                                                            .catch(err => {
                                                                res.json(err);
                                                            })
                                                    } else if (req.query.like && stock2.ip.indexOf(req.ip) == -1) {
                                                        stockChecker.updateStockToDB(stockName2, req.ip)
                                                            .then(stock2 => {
                                                                res.json({
                                                                    'stockData': [
                                                                        {
                                                                            'stock': stockName1,
                                                                            'price': price1,
                                                                            'rel_likes': stock1.like_count - stock2.like_count
                                                                        },
                                                                        {
                                                                            'stock': stockName2,
                                                                            'price': price2,
                                                                            'rel_likes': stock2.like_count - stock1.like_count
                                                                        }
                                                                    ]
                                                                })
                                                            })
                                                            .catch(err => {
                                                                res.json(err);
                                                            })
                                                    } else {
                                                        res.json({
                                                            'stockData': [
                                                                {
                                                                    'stock': stockName1,
                                                                    'price': price1,
                                                                    'rel_likes': stock1.like_count - stock2.like_count
                                                                },
                                                                {
                                                                    'stock': stockName2,
                                                                    'price': price2,
                                                                    'rel_likes': stock2.like_count - stock1.like_count
                                                                }
                                                            ]
                                                        })
                                                    }
                                                }
                                            })
                                            .catch(err => {
                                                res.json(err);
                                            })
                                    })
                                    .catch(err => {
                                        res.json(err);
                                    })
                            })
                    })
                    .catch(err => {
                        res.json(err);
                    })
            }
        });

}