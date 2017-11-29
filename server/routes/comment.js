import express from 'express';
import Comment from '../models/comment';
import mongoose from 'mongoose';

const router = express.Router();

//WRITE COMMENT
router.post('/', (req, res) => {
  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 1
      });
  }
  // CHECK ANGKEITEU ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(req.body.angkeiteuId)) {
      return res.status(400).json({
          error: "INVALID ANGKEITEU ID",
          code: 2
      });
  }
  // CHECK CONTENT VAILDITY
  if(typeof req.body.content !== 'string' || req.body.content === '') {
    return res.status(400).json({
      error: 'EMPTY CONTENT',
      code: 3
    });
  }
  // CREATE NEW COMMENT
  let comment = new Comment({
    angkeiteuId: req.body.angkeiteuId,
    writer: req.session.loginInfo.email,
    content: req.body.content
  });
  // SAVE IN DATABASE
  comment.save((err, newComment) => {
    if(err) throw err;
    return res.json({ success: true, id: newComment._id});
  });
});

//GET COMMENT LIST
router.get('/', (req, res) => {
  // CHECK ANGKEITEU ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(req.query.angkeiteuId)) {
      return res.status(400).json({
          error: "INVALID ANGKEITEU ID",
          code: 1
      });
  }
  Comment.find({angkeiteuId: req.query.angkeiteuId})
    .sort({'_id': -1})
    .limit(8)
    .exec((err, comments) => {
      if(err) throw err;
      return res.json(comments);
    });
});

router.get('/:listType/:id', (req, res) => {
  let listType = req.params.listType;
  let id = req.params.id;
  let findCondition = {};
  let sortCondition = {};

  // CHECK ANGKEITEU ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(req.query.angkeiteuId)) {
      return res.status(400).json({
          error: "INVALID ANGKEITEU ID",
          code: 1
      });
  }
  // CHECK LISTTYPE VALIDITY
  if(!(listType === 'old' || listType === 'new')) {
    return res.status(400).json({
      error: "INVALID LISTTYPE",
      code: 2
    });
  }
  //CHECK ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
          error: "INVALID ID",
          code: 3
      });
  }
  findCondition={angkeiteuId: req.query.angkeiteuId};
  if(listType === 'old') {
    findCondition['_id'] = { '$lt': id };
    sortCondition = { '_id': -1 };
  } else if(listType === 'new') {
    findCondition['_id'] = { '$gt': id } ;
    sortCondition = { '_id': 1 };
  }

  Comment.find(findCondition)
    .sort(sortCondition)
    .limit(4)
    .exec((err, comments) => {
      if(err) throw err;
      if(listType === 'old')
        return res.json(comments);
      else(lsitType === 'new')
        return res.json(comments.reverse());
    });
});

// INCREASE COMMENT RECOMMEDATION
router.put('/:id/recommend', (req, res) => {
  let id = req.params.id;
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
  //CHECK DUPLICATED RECOMMEND
  condition = {
    '_id': id, 'recommendations.accountId': loginInfo._id
  }
  Comment.findOne(condition, (err, comment) => {
    if(err) throw err;
    if(comment !== null) {
      return res.status(400).json({
        error: 'DUPLICATED RECOMMEDATION',
        code: 3
      });
    }
    //ADD RECOMMEDATION
    condition = { '_id': id };
    update = { '$push': { 'recommendations': { 'accountId': loginInfo._id } } };
    option = { 'new': true };
    Comment.findOneAndUpdate(condition, update, option, (err, comment) => {
      if(err) throw err;
      return res.json(comment);
    });
  });
});
export default router;
