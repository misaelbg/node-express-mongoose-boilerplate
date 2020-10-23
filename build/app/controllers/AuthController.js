"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _User = _interopRequireDefault(require("../models/User"));

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    (0, _classCallCheck2["default"])(this, AuthController);
  }

  (0, _createClass2["default"])(AuthController, [{
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, nome, senha, telefones, newUser, token;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, nome = _req$body.nome, senha = _req$body.senha, telefones = _req$body.telefones;

                if (email) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  message: 'E-mail inválido'
                }));

              case 3:
                if (nome) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  message: 'Nome inválido'
                }));

              case 5:
                if (senha) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  message: 'Senha inválida'
                }));

              case 7:
                newUser = new _User["default"]({
                  nome: nome,
                  senha: senha,
                  email: email,
                  telefones: telefones
                });
                _context.prev = 8;
                _context.next = 11;
                return newUser.save();

              case 11:
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](8);
                return _context.abrupt("return", res.status(400).json({
                  message: 'E-mail já existente'
                }));

              case 16:
                _context.next = 18;
                return newUser.generateToken();

              case 18:
                token = _context.sent;
                return _context.abrupt("return", res.json({
                  id: newUser.id,
                  nome: newUser.nome,
                  email: newUser.email,
                  data_criacao: newUser.createdAt,
                  data_atualizacao: newUser.updatedAt,
                  ultimo_login: newUser.lastLogin,
                  telefones: newUser.telefones,
                  token: token
                }));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[8, 13]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, senha, user, token;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, senha = _req$body2.senha;
                _context2.next = 3;
                return _User["default"].findOne({
                  email: email
                });

              case 3:
                user = _context2.sent;

                if (user) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  message: "Usuário e/ou senha inválidos"
                }));

              case 6:
                _context2.next = 8;
                return user.checkPassword(senha);

              case 8:
                if (_context2.sent) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  message: "Usuário e/ou senha inválidos"
                }));

              case 10:
                _context2.next = 12;
                return user.generateToken();

              case 12:
                token = _context2.sent;
                _context2.next = 15;
                return user.updateLastLoginTime();

              case 15:
                return _context2.abrupt("return", res.json({
                  id: user.id,
                  nome: user.nome,
                  email: user.email,
                  data_criacao: user.createdAt,
                  data_atualizacao: user.updatedAt,
                  ultimo_login: user.lastLogin,
                  telefones: user.telefones,
                  token: token
                }));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);
  return AuthController;
}();

module.exports = new AuthController();