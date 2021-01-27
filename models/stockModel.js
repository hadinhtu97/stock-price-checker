'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

const stockSchema = new mongoose.Schema({

});

const StockModel = mongoose.model('stock', stockSchema);

module.exports = StockModel