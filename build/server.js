"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var serverPort = process.env.PORT || 3000;

_app["default"].listen(serverPort, function () {
  console.log("Server running on port: ".concat(serverPort));
});