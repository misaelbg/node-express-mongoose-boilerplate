import mongoose from 'mongoose';

class Database {
  /**
  * Prepare database connection URL and Options
  * @param {String} uri - used to create a Mongo instance
  * @param {Object} options - Options for the new connection
  */
  constructor (uri, options) {
    this.mongoUri = uri;
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
}

export default Database;