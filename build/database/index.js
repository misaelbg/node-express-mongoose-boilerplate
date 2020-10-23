"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Database = /*#__PURE__*/function () {
  /**
  * Prepare database connection URL and Options
  * @param {String} uri - used to create a Mongo instance
  * @param {Object} options - Options for the new connection
  */
  function Database(uri, options) {
    (0, _classCallCheck2["default"])(this, Database);
    this.mongoUri = uri;
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
      } catch (err) {
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
  }]);
  return Database;
}();

var _default = Database;
exports["default"] = _default;