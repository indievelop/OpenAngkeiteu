import express from 'express';
import Angkeiteu from '../models/angkeiteu';

const router = express.Router();

//WRITE ANGKEITEU
router.post('/', (req, res)=>{
  console.log(req.body)
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

export default router;
