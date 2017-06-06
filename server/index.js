// Main starting point of the application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const seed = require('./seed.js');

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/contacts');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Error handler
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Seed fake data
//seed();

// Server Setup
const port = process.env.PORT || 3050;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

