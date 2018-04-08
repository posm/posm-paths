const express = require('express');
const config = require('./config');
const path = require('path');
const router = require('./routes');
const app = express();

app.use('/posm-view', router);
app.listen(config.PORT, () => console.log(`started server on port ${PORT}`));

