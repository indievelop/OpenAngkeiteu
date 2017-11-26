import express from 'express';
import account from './account';
import angkeiteu from './angkeiteu';
import comment from './comment';

const router = express.Router();
router.use('/account', account);
router.use('/angkeiteu', angkeiteu);
router.use('/comment', comment);

export default router;
