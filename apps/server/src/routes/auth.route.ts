import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authorize } from '../middlewares/protect';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/profile/edit', authorize, authController.editInfo);

export default router;
