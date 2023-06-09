const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    port: process.env.PORT || 8000,
    mongoose: {
        url: 'mongodb+srv://udaykirancodes:udaykirancodes@cluster0.ip9n0c4.mongodb.net/merntask?retryWrites=true&w=majority',
        // url: 'mongodb://localhost:27017/assignment?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
        options: {
            useNewUrlParser: true,
        }
    },
    email: {
        id: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    },
    jwt: 'MY#SECRET@CODE$'
}