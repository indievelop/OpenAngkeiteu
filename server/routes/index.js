import express from 'express';
import account from './account';
import angkeiteu from './angkeiteu';
import comment from './comment';
import file from './file';

const router = express.Router();
router.use('/account', account);
router.use('/angkeiteu', angkeiteu);
router.use('/comment', comment);
router.use('/file', file);

export default router;
