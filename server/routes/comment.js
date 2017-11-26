import express from 'express';
import Comment from '../models/comment';
import mongoose from 'mongoose';

const router = express.Router();

//WRITE COMMENT
router.post('/:angkeiteuId', (req, res) => {
  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 1
      });
  }
  // CHECK ANGKEITEU ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(req.params.angkeiteuId)) {
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
    angkeiteuId: req.params.angkeiteuId,
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
router.get('/:angkeiteuId', (req, res) => {
  // CHECK ANGKEITEU ID VALIDITY
  if(!mongoose.Types.ObjectId.isValid(req.params.angkeiteuId)) {
      return res.status(400).json({
          error: "INVALID ANGKEITEU ID",
          code: 1
      });
  }
  Comment.find({angkeiteuId: req.params.angkeiteuId})
    .sort({'_id': -1})
    .limit(8)
    .exec((err, comments) => {
      if(err) throw err;
      return res.json(comments);
    });
});

export default router;
