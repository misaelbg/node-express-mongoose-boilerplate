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
    } catch (error) {
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
    if (process.env.MONGODB_URI) {
      return process.env.MONGODB_URI;
    }

    // load connection settings, by the environment
    const configEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';
    const { host, user, password, dbname } = config[configEnv];
    return `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;
  }
}

module.exports = new Database();