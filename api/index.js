require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
    "https://foodrescue-1.vercel.app"
];
  
app.use(cors({
      origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
          } else {
              callback(new Error("Not allowed by CORS"));
          }
      },
      credentials: true
}));

app.use('/get', require('./router/pics'));
app.get("/", (req, res) => res.send("Working"));


app.listen(2000, (err) => {
    err ? console.log(err) : console.log('Server is running on port 2000');
});