import mongoose from 'mongoose';
import config from '../config/database.json';

const { host, user, password, dbname } = config[process.env.NODE_ENV || 'test'];

class Database {
  constructor () {
    // create database connection URL
    this.mongoUri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`
    this.options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }

    mongoose.Promise = Promise;
  }

  connect() {
    try {
      mongoose.connect(this.mongoUri, this.options);
    } catch (error) {
      throw new Error(`unable to connect to database: ${this.mongoUri}`);
    }
  }
}

module.exports = new Database();