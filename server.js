require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const serveIndex = require('serve-index');
app.use(express.static('uploads'));

const whitelist = ['https://training-management.now.sh/']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
//routes
const topicRoute = require('./routes/topic');
const uploadRoute = require('./routes/upload');

mongoose.connect('mongodb+srv://njay:2828@njay-iy3to.mongodb.net/tm?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database');
})

app.get('/', (req, res) => {
    res.send("We are at home.")
})
app.use('/uploads', express.static('uploads'), serveIndex('uploads', { 'icons': true }));
app.use('/api', topicRoute);

app.use('/upload', uploadRoute);

app.listen(process.env.PORT, () => console.log('Server is up!'));