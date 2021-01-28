'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

module.exports = (app) => {

    app.use(cors({ optionsSuccessStatus: 200 }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet());

    app.use(express.static(path.join(__dirname, '../public')));

}