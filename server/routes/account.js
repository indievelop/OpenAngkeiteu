import express from 'express';
import Account from '../models/account';

const router = express.Router();
/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "email": "test", "password": "test" }
    ERROR CODES:
        1: BAD EMAIL
        2: BAD PASSWORD
        3: EMAIL EXISTS
*/
router.post('/signup', (req, res) => {
    //CHECK EMAIL FORMAT
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(req.body.email)) {
        return res.status(400).json({
            error: "BAD EMAIL",
            code: 1
        });
    }
    // CHECK PASS LENGTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }
    // CHECK USER EXISTANCE
   Account.findOne({ email: req.body.email }, (err, exists) => {
       if (err) throw err;
       if(exists){
           return res.status(409).json({
               error: "EMAIL EXISTS",
               code: 3
           });
       }
       // CREATE ACCOUNT
       let account = new Account({
           email: req.body.email,
           password: req.body.password
       });
       account.password = account.generateHash(account.password);
       // SAVE IN THE DATABASE
       account.save( err => {
           if(err) throw err;
           return res.json({ success: true });
       });
   });
});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "email": "test@test.com", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', (req, res) => {
  if(typeof req.body.password !== "string") {
    return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
    });
  }
  // FIND THE USER BY EMAIL
  Account.findOne({ email: req.body.email}, (err, account) => {
    if(err) throw err;
    // CHECK ACCOUNT EXISTANCY
    if(!account) {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }
    // CHECK WHETHER THE PASSWORD IS VALID
    if(!account.validateHash(req.body.password)) {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }
    // ALTER SESSION
    let session = req.session;
    session.loginInfo = {
        _id: account._id,
        email: account.email
    };
    // RETURN SUCCESS and info.
    return res.json({
        success: true,
        info: req.session.loginInfo
    });
  });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', (req, res) => {
  if(typeof req.session.loginInfo === "undefined") {
      return res.status(401).json({
          error: 1
      });
  }

  res.json({ info: req.session.loginInfo });
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});

export default router;
