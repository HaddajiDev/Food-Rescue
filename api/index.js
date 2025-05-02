require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: [
        'https://foodrescue-1.vercel.app', 
        'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Origin', 
        'X-Requested-With', 
        'Content-Type', 
        'Accept', 
        'Authorization'
    ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.options('*', cors());

app.use('/get', require('./router/pics'));
app.get("/", (req, res) => res.send("Working"));


app.listen(2000, (err) => {
    err ? console.log(err) : console.log('Server is running on port 2000');
});