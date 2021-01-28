'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = chai.assert;
const server = 'http://localhost:3000';
chai.use(chaiHttp);

describe('Functional tests', () => {

    describe('Viewing one stock', () => {
        it('GET request to /api/stock-prices', (done) => {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: 'goog' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body.stockData);
                    assert.isString(res.body.stockData.stock);
                    assert.isNumber(res.body.stockData.price);
                    assert.isNumber(res.body.stockData.likes);
                    done();
                })
        })
    })

    describe('Viewing one stock and liking it', () => {
        it('GET request to /api/stock-prices', (done) => {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: 'goog', like: 'true' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body.stockData);
                    assert.isString(res.body.stockData.stock);
                    assert.isNumber(res.body.stockData.price);
                    assert.isNumber(res.body.stockData.likes);
                    done();
                })
        })
    })

    describe('Viewing the same stock and liking it again', () => {
        it('GET request to /api/stock-prices', (done) => {
            let random = Date.now();
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: random })
                .then(res => {
                    let like_before = res.body.stockData.likes;
                    chai.request(server)
                        .get('/api/stock-prices')
                        .query({ stock: random, like: true })
                        .end((err, res) => {
                            let like_after = res.body.stockData.likes;
                            assert.equal(like_before, like_after - 1);
                            done();
                        })
                })
                .catch(err => done(err))
        })
    })

    describe('Viewing two stocks', () => {
        it('GET request to /api/stock-prices', (done) => {
            chai.request(server)
                .get('/api/stock-prices?stock=goog&stock=msft')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body.stockData);
                    assert.isString(res.body.stockData[0].stock);
                    assert.isNumber(res.body.stockData[0].price);
                    assert.isNumber(res.body.stockData[0].rel_likes);
                    assert.isString(res.body.stockData[1].stock);
                    assert.isNumber(res.body.stockData[1].price);
                    assert.isNumber(res.body.stockData[1].rel_likes);
                    done();
                })
        })
    })

    describe('Viewing two stocks and liking them', () => {
        it('GET request to /api/stock-prices', (done) => {
            chai.request(server)
                .get('/api/stock-prices?stock=goog&stock=msft&like=true')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body.stockData);
                    assert.isString(res.body.stockData[0].stock);
                    assert.isNumber(res.body.stockData[0].price);
                    assert.isNumber(res.body.stockData[0].rel_likes);
                    assert.isString(res.body.stockData[1].stock);
                    assert.isNumber(res.body.stockData[1].price);
                    assert.isNumber(res.body.stockData[1].rel_likes);
                    done();
                })
        })
    })
})