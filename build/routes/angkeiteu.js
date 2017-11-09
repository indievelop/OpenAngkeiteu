'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _angkeiteu = require('../models/angkeiteu');

var _angkeiteu2 = _interopRequireDefault(_angkeiteu);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// WRITE ANGKEITEU
router.post('/', function (req, res) {
  // CHECK LOGIN STATUS
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 1
    });
  }

  //CHECK ANGKEITEU VAILD
  if (typeof req.body.title !== 'string' || req.body.title === '') {
    return res.status(400).json({
      error: 'EMPTY TITLE',
      code: 2
    });
  }

  if (typeof req.body.description !== 'string' || req.body.description === '') {
    return res.status(400).json({
      error: 'EMPTY DESCRIPTION',
      code: 3
    });
  }

  if (req.body.options.length == 0) {
    return res.status(400).json({
      error: 'EMPTY OPTIONS',
      code: 4
    });
  }

  //CREATE NEW ANGKEITEU
  var angkeiteu = new _angkeiteu2.default({
    writer: req.session.loginInfo.email,
    title: req.body.title,
    description: req.body.description,
    options: req.body.options
  });

  //SAVE IN DATABASE
  angkeiteu.save(function (err) {
    if (err) throw err;
    return res.json({ success: true });
  });
});

// GET RECENT ANGKEITEU LIST
router.get('/', function (req, res) {
  _angkeiteu2.default.find().sort({ "_id": -1 }).limit(8).exec(function (err, angkeiteus) {
    if (err) throw err;
    return res.json(angkeiteus);
  });
});

// GET ANGKEITEU
router.get('/:id', function (req, res) {
  var id = req.params.id;

  //CHECK ID VALIDITY
  if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    });
  }

  var condition = {
    '_id': id
  };
  var update = {
    '$inc': { 'viewCount': 1 }
  };
  var option = {
    'new': true
  };
  _angkeiteu2.default.findOneAndUpdate(condition, update, option, function (err, angkeiteu) {
    if (err) throw err;
    return res.json(angkeiteu);
  });
});

// GET OLD ANGKEITEU LIST BY LAST ANGKEITEU ID IN CLIENT DATAS
router.get('/old/:id', function (req, res) {
  var id = req.params.id;
  var condition = {};

  //CHECK ID VALIDITY
  if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    });
  }

  condition = {
    '_id': { '$lt': id }
  };
  _angkeiteu2.default.find(condition).sort({ '_id': -1 }).limit(4).exec(function (err, angkeiteus) {
    if (err) throw err;
    return res.json(angkeiteus);
  });
});

// GET NEW ANGKEITEU LIST BY  FIRST ANGKEITEU ID IN CLIENT DATAS
router.get('/new/:id', function (req, res) {
  var id = req.params.id;
  var condition = {};

  //CHECK ID VALIDITY
  if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 1
    });
  }

  condition = {
    '_id': { '$gt': id }
  };
  _angkeiteu2.default.find(condition).sort({ '_id': 1 }).limit(4).exec(function (err, angkeiteus) {
    if (err) throw err;
    return res.json(angkeiteus.reverse());
  });
});

//GET HOT ANKGEITEU LIST
router.get('/hot/:period/:id?', function (req, res) {
  var period = req.params.period;
  var id = req.query.id;
  var today = (0, _moment2.default)().startOf('day');
  var tomorrow = (0, _moment2.default)(today).add(1, 'days');

  // CHECK PERIOD VALIDITY
  if (period !== 'today') {
    return res.status(400).json({
      error: "INVALID PERIOD",
      code: 1
    });
  }
  //get api/angkeiteu/hot/today
  if (typeof id === 'undefined') {
    _angkeiteu2.default.find({
      createdDate: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate()
      }
    }).sort({ viewCount: -1 }).limit(8).exec(function (err, angkeiteus) {
      if (err) throw err;
      return res.json(angkeiteus);
    });
    return;
  }

  // CHECK ANGKEITEU ID VALIDITY
  if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "INVALID ID",
      code: 2
    });
  }

  //GET UNDER HOT ANGKEITEU
  _angkeiteu2.default.findOne({
    '_id': id
  }).exec(function (err, angkeiteu) {
    if (err) throw err;
    return _angkeiteu2.default.find({
      viewCount: { $lt: angkeiteu.viewCount },
      createdDate: {
        $gte: today.toDate(),
        $lt: today.toDate()
      }
    }).sort({ viewCount: -1 }).limit(8).exec(function (err, angkeiteus) {
      if (err) throw err;
      return res.json(angkeiteus);
    });
  });
});

//PARTICIPATE ANGKEITEU
router.put('/:id/selectOption/:optionId', function (req, res) {
  var id = req.params.id;
  var optionId = req.params.optionId;
  var loginInfo = req.session.loginInfo;
  var condition = {};
  var update = {};
  var option = {};

  //CHECK LOGIN STATUS
  if (typeof loginInfo === 'undefined') {
    return res.status(403).json({
      error: "NOT LOGGED IN",
      code: 1
    });
  }
  //CHECK ANGKEITEU ID VALIDITY
  if (!_mongoose2.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'INVALID ID',
      code: 2
    });
  }
  //CHECK OPTION ID VALIDITY
  if (!_mongoose2.default.Types.ObjectId.isValid(optionId)) {
    return res.status(400).json({
      error: 'INVALID OPTION ID',
      code: 3
    });
  }
  //CHECK DUPLICATED PARTICIPATION
  condition = {
    '_id': id, 'participants.email': loginInfo.email
  };
  _angkeiteu2.default.findOne(condition, function (err, angkeiteu) {
    if (err) throw err;
    if (angkeiteu !== null) {
      return res.status(400).json({
        error: 'DUPLICATED PARTICIPATION',
        code: 4
      });
    }
    //SELECT COUNT INC
    condition = {
      '_id': id, 'options._id': optionId
    };
    update = {
      '$inc': { 'options.$.selectCount': 1 },
      '$push': { 'participants': { 'email': loginInfo.email, 'selectedOptionId': optionId } }
    };
    option = {
      'new': true
    };
    _angkeiteu2.default.findOneAndUpdate(condition, update, option, function (err, angkeiteu) {
      if (err) throw err;
      return res.json(angkeiteu);
    });
  });
});

exports.default = router;