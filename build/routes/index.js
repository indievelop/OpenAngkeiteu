'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _angkeiteu = require('./angkeiteu');

var _angkeiteu2 = _interopRequireDefault(_angkeiteu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use('/account', _account2.default);
router.use('/angkeiteu', _angkeiteu2.default);

exports.default = router;