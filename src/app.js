import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import Database from './database';

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.testing"
})

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
    // just create a new connection outside the test environment
    if (process.env.NODE_ENV !== 'test') {
      new Database(process.env.MONGODB_URI).connect();
    }
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;