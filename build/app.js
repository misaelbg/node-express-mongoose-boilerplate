"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _routes2 = _interopRequireDefault(require("./routes"));

var _database2 = _interopRequireDefault(require("./database"));

_dotenv["default"].config(process.env.NODE_ENV === 'production' ? '.env' : '.test.env');

var App = /*#__PURE__*/function () {
  function App() {
    (0, _classCallCheck2["default"])(this, App);
    this.express = new _express["default"]();
    this.middlewares();
    this.database();
    this.routes();
  }

  (0, _createClass2["default"])(App, [{
    key: "middlewares",
    value: function middlewares() {
      this.express.use((0, _cors["default"])());
      this.express.use(_bodyParser["default"].json());
    }
  }, {
    key: "database",
    value: function database() {
      // just create a new connection outside the test environment
      if (process.env.NODE_ENV !== 'test') {
        _database2["default"].connect();
      }
    }
  }, {
    key: "routes",
    value: function routes() {
      this.express.use(_routes2["default"]);
    }
  }]);
  return App;
}();

module.exports = new App().express;