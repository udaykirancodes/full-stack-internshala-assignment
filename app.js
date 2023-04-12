const cors = require('cors');
const express = require('express');
const app = express();
const helmet = require('helmet')
const path = require('path')
// import middlewares
app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors(""))

// importing routes
const routes = require('./routes/index');


app.use('/api', routes);
app.use(express.static('./frontend/build'));
// Static Files Sender
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});

module.exports = app;