require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');

const authRouter = require('./routes/auth');
const deleteRouter = require('./routes/delete');
const getRouter = require('./routes/get');
const insertRouter = require('./routes/insert');
const updateRouter = require('./routes/update');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/get', getRouter);
app.use('/delete', deleteRouter);
app.use('/insert', insertRouter);
app.use('/update', updateRouter);

const buildPath = path.join(__dirname, '/../client/build');

app.use('/', express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

module.exports = app;
