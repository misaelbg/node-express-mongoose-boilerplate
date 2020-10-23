"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _util = require("util");

/**
 * Token validation module
 */
module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, _authHeader$split, _authHeader$split2, token, decoded;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authHeader = req.headers.authorization;

            if (authHeader) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Não autorizado'
            }));

          case 3:
            if (authHeader.startsWith('Bearer ')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Não autorizado'
            }));

          case 5:
            _authHeader$split = authHeader.split(' '), _authHeader$split2 = (0, _slicedToArray2["default"])(_authHeader$split, 2), token = _authHeader$split2[1];
            _context.prev = 6;
            _context.next = 9;
            return (0, _util.promisify)(_jsonwebtoken["default"].verify)(token, process.env.APP_SECRET);

          case 9:
            decoded = _context.sent;
            req.userId = decoded.id;
            return _context.abrupt("return", next());

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](6);
            return _context.abrupt("return", res.status(401).json({
              message: 'Não autorizado'
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 14]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();