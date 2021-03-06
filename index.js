const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors = require('cors');
const morgan = require('morgan');
const contactsRouter = require('./routes/contacts.routes');
const userRouter = require('./routes/users.routes'); //auth
const path = require('path');

dotenv.config();

const MONGO_URI = process.env.DB_CLOUD;

const PORT = process.env.port || 8080;

class Server {
  constructor() {
    this.server = null;
  }
  start() {
    this.server = express();
    this.initMiddlewares();
    this.initRoutes();
    this.listen();
    this.connectToDb();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: '*' }));
    this.server.use(morgan('combined'));
    // his.server.use('/images', express.static('public/images'))
    this.server.use('/images', express.static(path.join('public/images'))); //(images) статична роздача папки public по роуту /images
  }

  initRoutes() {
    this.server.use('/contacts', contactsRouter);
    this.server.use('', userRouter); //auth
  }

  async connectToDb() {
    try {
      if (
        await mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        })
      ) {
        console.log('Database connection successful');
      }
    } catch (error) {
      console.log(err.message);
      process.exit(1);
    }
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log('server is started in:', PORT);
    });
  }
}

const server = new Server();
server.start();
