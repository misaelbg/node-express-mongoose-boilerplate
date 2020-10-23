"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = new _mongoose["default"].Schema({
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    required: true,
    "default": Date.now
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  telefones: [{
    numero: String,
    ddd: String,
    _id: false
  }]
});
userSchema.set('timestamps', true);
module.exports = userSchema;