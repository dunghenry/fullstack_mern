import express from 'express';
import { verifyToken } from '../middleware/auth';
import authController from '../controllers/authController';
const router = express.Router();
router.post('/refresh', authController.requestRefreshToken);
router.post('/register', authController.regsiter);
router.post('/login', authController.login);
router.post('/logout', verifyToken, authController.logout);
export default router;