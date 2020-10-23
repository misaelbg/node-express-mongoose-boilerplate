"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _auth = _interopRequireDefault(require("./app/middleware/auth"));

var _AuthController = _interopRequireDefault(require("./app/controllers/AuthController"));

var _UserController = _interopRequireDefault(require("./app/controllers/UserController"));

var routes = new _express.Router();
routes.post('/signin', _AuthController["default"].signIn);
routes.post('/signup', _AuthController["default"].signUp);
routes.use(_auth["default"]);
routes.get('/user/:id', _UserController["default"].find);
module.exports = routes;