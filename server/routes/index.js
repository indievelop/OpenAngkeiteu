import express from 'express';
import account from './account';
import angkeiteu from './angkeiteu';

const router = express.Router();
router.use('/account', account);
router.use('/angkeiteu', angkeiteu);

export default router;
