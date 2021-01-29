const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const userRouter = require('./routes/user.routes');

const PORT = process.env.port || 8080;
