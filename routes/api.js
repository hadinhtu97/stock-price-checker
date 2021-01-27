'use strict';

const StockChecker = require('../controllers/stockChecker.js')

module.exports = (app) => {

    let stockChecker = new StockChecker()

    app.route('/api/stock-prices')
        .get((req, res) => {
            stockChecker.getStockPrice(req.query.stock)
                .then(price => {
                    console.log(price)
                    res.json(price)
                })
        });

}