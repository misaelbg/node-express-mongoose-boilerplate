import mongoose from 'mongoose';
import config from '../config/database.json';

class Database {
  /**
  * Prepare database connection URL and Options
  * @param {Object} options - Options for the new connection
  */
  constructor (options) {
    this.mongoUri = this.getUri();
    this.options = options || {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    };

    mongoose.Promise = Promise;
  }

  /**
  * Create new database connection.
  * @returns {void}
  */
  connect() {
    try {
      mongoose.connect(this.mongoUri, this.options);
    } catch (err) {
      throw new Error(`unable to connect to database: ${this.mongoUri}`);
    }
  }

  /**
  * Close the database connection.
  * @returns {void}
  */
  disconnect() {
    mongoose.connection.close();
  }

  getUri() {
    if (!process.env.MONGODB_URI) {
      throw new Error('The environment MONGODB_URI is not found');
    }

    return process.env.MONGODB_URI;
  }
}

module.exports = new Database();