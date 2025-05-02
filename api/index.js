require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["https://foodrescue-1.vercel.app/", "https://food-rescue-server-virid.vercel.app"],
}));


app.use('/get', require('./router/pics'));
app.get("/", (req, res) => res.send("Working"));


app.listen(2000, (err) => {
    err ? console.log(err) : console.log('Server is running on port 2000');
});