const cors = require('cors');
const express = require('express');
const app = express();
const helmet = require('helmet')
// import middlewares
app.use(express.json());
// app.use(cors());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(cors(""))
app.listen(3000, () => console.log('Hello'));
app.get('/', (req, res) => res.send('UdayKiran👻'));

// Static Files Sender
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

module.exports = app;