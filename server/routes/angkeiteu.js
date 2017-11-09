import express from 'express';
import Angkeiteu from '../models/angkeiteu';
import mongoose from 'mongoose';
import moment from 'moment';

const router = express.Router();

// WRITE ANGKEITEU
router.post('/', (req, res)=>{
  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 1
      });
  }

  //CHECK ANGKEITEU VAILD
  if(typeof req.body.title !== 'string' ||
      req.body.title === '') {
        return res.status(400).json({
          error: 'EMPTY TITLE',
          code: 2
        });
  }

  if(typeof req.body.description !== 'string' ||
      req.body.description === '') {
        return res.status(400).json({
          error: 'EMPTY DESCRIPTION',
          code: 3
        });
  }

  if(req.body.options.length == 0) {
    return res.status(400).json({
      error: 'EMPTY OPTIONS',
      code: 4
    });
  }

  //CREATE NEW ANGKEITEU
  let angkeiteu = new Angkeiteu({
    writer: req.session.loginInfo.email,
    title: req.body.title,
    description: req.body.description,
    options: req.body.options
  });

  //SAVE IN DATABASE
  angkeiteu.save( err => {
    if(err) throw err;
    return res.json({ success: true});
  });
});

// GET RECENT ANGKEITEU LIST
router.get('/', (req, res) => {
  Angkeiteu.find()
   .sort({"_id": -1})
   .limit(8)
   .exec((err, angkeiteus) => {
       if(err) throw err;
       return res.json(angkeiteus);
   });
});

// GET ANGKEITEU
router.get('/:id', (req, res) => {
  let id = req.params.id;
  let condition = {};
  let update = {};
  let option ={};

  //CHECK ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
          error: "INVALID ID",
          code: 1
      });
  }

  condition = {
    '_id': id
  };
  update = {
    '$inc': {'viewCount': 1}
  };
  option = {
    'new': true
  }
  Angkeiteu.findOneAndUpdate(condition, update, option, (err, angkeiteu) => {
    if(err) throw err;
    return res.json(angkeiteu);
  });
});

// GET OLD ANGKEITEU LIST BY LAST ANGKEITEU ID IN CLIENT DATAS
router.get('/old/:id', (req, res) => {
  let id = req.params.id;
  let condition = {};

  //CHECK ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
          error: "INVALID ID",
          code: 1
      });
  }

  condition = {
    '_id': { '$lt': id }
  };
  Angkeiteu.find(condition)
  .sort({'_id': -1})
  .limit(4)
  .exec((err, angkeiteus) => {
    if(err) throw err;
    return res.json(angkeiteus);
  });
});

// GET NEW ANGKEITEU LIST BY  FIRST ANGKEITEU ID IN CLIENT DATAS
router.get('/new/:id', (req, res) => {
  let id = req.params.id;
  let condition = {};

  //CHECK ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
          error: "INVALID ID",
          code: 1
      });
  }

  condition = {
    '_id': { '$gt': id }
  };
  Angkeiteu.find(condition)
  .sort({'_id': 1})
  .limit(4)
  .exec((err, angkeiteus) => {
    if(err) throw err;
    return res.json(angkeiteus.reverse());
  });
});

//GET HOT ANKGEITEU LIST
router.get('/hot/:period/:id?', (req, res) => {
  let period = req.params.period;
  let id = req.query.id;
  let today = moment().startOf('day');
  let tomorrow = moment(today).add(1,'days');
  let thisMonth = moment().startOf('month');
  let nextMoth = moment(thisMonth).add(1,'months');
  let condition = {};
  let targetDate = {};
  let targetNextDate = {};

  // CHECK PERIOD VALIDITY
  if(!(period === 'today' || period === 'thisMonth')) {
      return res.status(400).json({
          error: "INVALID PERIOD",
          code: 1
      });
  }

  if(period === 'today') {
    //get api/angkeiteu/hot/today
    targetDate = today.toDate();
    targetNextDate = tomorrow.toDate();
  } else if(period === 'thisMonth') {
    //get api/angkeiteu/hot/thisMonth
    targetDate = thisMonth.toDate();
    targetNextDate = nextMoth.toDate();
  }
  condition = {
    'createdDate': {
      '$gte': targetDate,
      '$lt': targetNextDate
    }
  }
  if(typeof id === 'undefined') {
    Angkeiteu.find(condition)
    .sort({viewCount: -1})
    .limit(8)
    .exec((err, angkeiteus) => {
      if(err) throw err;
      return res.json(angkeiteus);
    });
    return;
  }

  // CHECK ANGKEITEU ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
          error: "INVALID ID",
          code: 2
      });
  }

  //GET UNDER HOT ANGKEITEU
  Angkeiteu.findOne({
    '_id': id
  }).exec((err, angkeiteu) => {
    if(err) throw err;
    return Angkeiteu.find({
      viewCount: { $lt: angkeiteu.viewCount},
      createdDate: {
        $gte: today.toDate(),
        $lt: today.toDate()
      }
    }).sort({viewCount: -1})
      .limit(8)
      .exec((err, angkeiteus) => {
        if(err) throw err;
        return res.json(angkeiteus);
      });
  });
});

//PARTICIPATE ANGKEITEU
router.put('/:id/selectOption/:optionId', (req, res) => {
  let id = req.params.id;
  let optionId = req.params.optionId;
  let loginInfo = req.session.loginInfo;
  let condition = {};
  let update = {};
  let option = {};

  //CHECK LOGIN STATUS
  if(typeof loginInfo === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 1
      });
  }
  //CHECK ANGKEITEU ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error:'INVALID ID',
      code: 2
    });
  }
  //CHECK OPTION ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(optionId)) {
    return res.status(400).json({
      error:'INVALID OPTION ID',
      code: 3
    });
  }
  //CHECK DUPLICATED PARTICIPATION
  condition = {
    '_id': id, 'participants.email':  loginInfo.email
  }
  Angkeiteu.findOne(condition, (err, angkeiteu) => {
    if(err) throw err;
    if(angkeiteu !== null) {
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
      '$inc': {'options.$.selectCount' :1},
      '$push': {'participants': {'email': loginInfo.email, 'selectedOptionId': optionId} }
    };
    option = {
      'new': true
    }
    Angkeiteu.findOneAndUpdate(condition, update, option, (err, angkeiteu) => {
      if(err) throw err;
      return res.json(angkeiteu);
    });
  });
});

export default router;
