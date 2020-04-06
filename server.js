require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const serveIndex = require('serve-index');
app.use(express.static('uploads'));
app.use(cors());
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