'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

const stockSchema = new mongoose.Schema({
    name: String,
    like_count: Number,
    ip: [String]
});

const StockModel = mongoose.model('stock', stockSchema);

module.exports = StockModel