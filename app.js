const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const membersRouter = require('./routes/club');
const { connectDataBase } = require('./db/db');

const app = express();

//CONFIGURACION
app.use(logger('dev'));
app.use(express.json());
app.use(cors());


app.use('/', membersRouter);


connectDataBase();

module.exports = app