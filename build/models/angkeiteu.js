'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Angkeiteu = new Schema({
  writer: String,
  title: String,
  description: String,
  options: [{
    description: String,
    selectCount: { type: Number, default: 0 }
  }],
  participants: [{
    email: String,
    selectedOptionId: String,
    participationDate: { type: Date, default: Date.now }
  }],
  viewCount: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('angkeiteu', Angkeiteu);