const mongoose = require('mongoose');
const app = require('./app');

const config = require('./config');

// connecting to database
mongoose.connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
        console.log('Connected to DataBase');
        app.listen(config.port, () => {
            console.log("Server Started : " + config.port);
        })
    })
    .catch((err) => console.log(err.message));