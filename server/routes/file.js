import express from 'express';
import File from '../models/file';
import mongoose from 'mongoose';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    file.uploadedFile = {
      name: req.body.connectedObj_id,
      ext: file.mimetype.split('/')[1]
    };
    file.uploadedFile.path = `/uploads/${file.uploadedFile.name}.${file.uploadedFile.ext}`;
    cb(null, `${file.uploadedFile.name}.${file.uploadedFile.ext}`);
  }
});
const fileFilter = (req, file, cb) => {
  if(!mongoose.Types.ObjectId.isValid(req.body.connectedObj_id))
    return cb(new Error('INVAILD ID'));
  cb(null, true);
}
const upload = multer({ 'storage': storage, 'fileFilter': fileFilter}).single('imgFile');

// UPLOAD IMAGE_FILE
router.post('/image', (req, res) =>{
  // CHECK LOGIN STATUS
  if(typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
          errorMessage: "NOT LOGGED IN"
      });
  }
  // UPLOAD
  upload(req, res, (err) => {
    if(err) return res.status(400).json({'errorMessage': err.message});

    let file = new  File({
      connectedObj: {
        kind: req.body.connectedObj_kind,
        id: req.body.connectedObj_id
      },
      path: req.file.uploadedFile.path
    });
    console.log(file);
    file.save((err, newFile) => {
      if(err) throw err;
      return res.json({ success: true, id: newFile._id});
    });
  });
});

// GET File
router.get('/image', (req, res) => {
  File.findOne(req.query)
  .exec((err, file) => {
    if(err) throw err;
    return res.json(file);
  })
});

export default router;
