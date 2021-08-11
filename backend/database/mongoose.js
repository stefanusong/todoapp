const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then( () => console.log("Database Connected") )
    .catch( (err) => console.log(err) );

module.exports = mongoose;