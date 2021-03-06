'use strict';

require("dotenv").config();
const express = require("express");
const app = express();

const middleware = require('./routes/middleware.js')
const viewRoutes = require('./routes/view.js');
const apiRoutes = require('./routes/api.js');
const errorRoutes = require('./routes/404.js');

// Routes below
middleware(app);

viewRoutes(app);
apiRoutes(app);

errorRoutes(app);
// Routes above 


app.listen(3000, () => {
    console.log('Your app is listening on port 3000');
})