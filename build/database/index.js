"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _database = _interopRequireDefault(require("../config/database.json"));

var Database = /*#__PURE__*/function () {
  /**
  * Prepare database connection URL and Options
  * @param {Object} options - Options for the new connection
  */
  function Database(options) {
    (0, _classCallCheck2["default"])(this, Database);
    this.mongoUri = this.getUri();
    this.options = options || {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    };
    _mongoose["default"].Promise = Promise;
  }
  /**
  * Create new database connection.
  * @returns {void}
  */


  (0, _createClass2["default"])(Database, [{
    key: "connect",
    value: function connect() {
      try {
        _mongoose["default"].connect(this.mongoUri, this.options);
      } catch (error) {
        throw new Error("unable to connect to database: ".concat(this.mongoUri));
      }
    }
    /**
    * Close the database connection.
    * @returns {void}
    */

  }, {
    key: "disconnect",
    value: function disconnect() {
      _mongoose["default"].connection.close();
    }
  }, {
    key: "getUri",
    value: function getUri() {
      if (process.env.MONGODB_URI) {
        return process.env.MONGODB_URI;
      } // load connection settings, by the environment


      var configEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';
      var _config$configEnv = _database["default"][configEnv],
          host = _config$configEnv.host,
          user = _config$configEnv.user,
          password = _config$configEnv.password,
          dbname = _config$configEnv.dbname;
      return "mongodb+srv://".concat(user, ":").concat(password, "@").concat(host, "/").concat(dbname, "?retryWrites=true&w=majority");
    }
  }]);
  return Database;
}();

module.exports = new Database();