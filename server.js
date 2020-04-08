require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const topicRoute = require('./routes/topic');

mongoose.connect('mongodb+srv://njay:2828@njay-iy3to.mongodb.net/tm?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database');
})

app.get('/', (req, res) => {
    res.send("We are at home.")
})
app.use('/api', topicRoute);

app.listen(process.env.PORT, () => console.log('Server is up!'));