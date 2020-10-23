"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../../database/schemas/User"));

/**
 * Check if the password has been changed and apply new encryption
 * Update the last login date with the creation date
 */
_User["default"].pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = this; // only hash the password if it has been modified or new

            if (user.isModified('senha')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next());

          case 3:
            _context.next = 5;
            return _bcryptjs["default"].hash(this.senha, process.env.SALT_FACTOR || 8);

          case 5:
            this.senha = _context.sent;
            // Set default as creation date
            this.lastLogin = this.createdAt;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * Check if the password entered is correct
 * @param {String} senha - user password
 * @returns {Boolean}
 */


_User["default"].methods.checkPassword = function (senha) {
  return _bcryptjs["default"].compare(senha, this.senha);
};
/**
 * Generate a new token with the current user id
 * @returns {String} - Json Web Token
 */


_User["default"].methods.generateToken = function () {
  return _jsonwebtoken["default"].sign({
    id: this.id
  }, process.env.APP_SECRET);
};
/**
 * Update the User last login date
 * @returns {void}
 */


_User["default"].methods.updateLastLoginTime = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return this.updateOne({
            lastLogin: Date.now()
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));
/**
 * Compare date-time with last login and return difference in minutes
 * @param {Date} date - Current time-date to compare
 * @returns {Number} - difference in minutes
 */

_User["default"].methods.lastLoginBefore = function (date) {
  var lastLogin = new Date(this.lastLogin);
  var diff = (date.getTime() - lastLogin.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

module.exports = new _mongoose["default"].model('User', _User["default"]);