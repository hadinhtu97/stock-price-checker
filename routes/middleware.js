'use strict'

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

module.exports = (app) => {

    app.use(cors({ origin: '*' }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"]
        }
    }))

}