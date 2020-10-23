"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _User = _interopRequireDefault(require("../models/User"));

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, [{
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var userId, user, lastLoginMinutes;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = req.params.id;
                _context.next = 3;
                return _User["default"].findOne({
                  _id: userId
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(404).json({
                  message: 'Usuário não encontrado'
                }));

              case 6:
                if (!(user.id !== req.userId)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  message: 'Não autorizado'
                }));

              case 8:
                lastLoginMinutes = user.lastLoginBefore(new Date());

                if (!(lastLoginMinutes > 30)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  message: 'Sessão inválida'
                }));

              case 11:
                return _context.abrupt("return", res.json({
                  id: user.id,
                  nome: user.nome,
                  email: user.email,
                  data_criacao: user.createdAt,
                  data_atualizacao: user.updatedAt,
                  ultimo_login: user.lastLogin,
                  telefones: user.telefones
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function find(_x, _x2) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }]);
  return UserController;
}();

module.exports = new UserController();