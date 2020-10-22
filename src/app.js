import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import database from './database';

dotenv.config(process.env.NODE_ENV === 'production' ? '.env' : '.test.env');

class App {
  constructor() {
    this.express = new express();

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares () {
    this.express.use(cors());
    this.express.use(bodyParser.json());
  }

  database () {
    database.connect();
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;