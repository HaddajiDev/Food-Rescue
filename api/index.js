require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());


app.use('/', require('./router/pics'));


app.listen(2000, (err) => {
    err ? console.log(err) : console.log('Server is running on port 3000');
});