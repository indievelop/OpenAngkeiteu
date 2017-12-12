import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.id}.${file.mimetype.split('/')[1]}`);
  }
});
const fileFilter = (req, file, cb) => {
  if(!mongoose.Types.ObjectId.isValid(req.body.id))
    return cb(new Error('INVAILD ID'));
  cb(null, true);
}
const upload = multer({ 'storage': storage, 'fileFilter': fileFilter}).single('imgFile');

// UPLOAD IMAGE_FILE
router.post('/image', (req, res)=>{
  upload(req, res, (err) => {
    if(err) return res.status(400).json({'errorMessage': err.message});
    return res.json({success: true});
  });
});

export default router;
