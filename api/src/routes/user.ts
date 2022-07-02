import express from 'express';
import userController from './../controllers/userController';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } from '../middleware/auth';
const router = express.Router();
router.get('/', verifyTokenAndAdmin, userController.getUsers);
router.get('/:id', verifyTokenAndUserAuthorization, userController.getUser);
router.delete('/:id', verifyTokenAndAdmin, userController.deleteUser);
router.put('/:id', verifyTokenAndUserAuthorization, userController.updateUser);
export default router;