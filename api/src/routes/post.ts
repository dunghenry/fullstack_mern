import express from 'express';
const router = express.Router();
import {verifyToken, verifyTokenAndAdmin} from '../middleware/auth';
import postController from '../controllers/postController';
router.get('/total', verifyToken, postController.getAllPosts)
router.post('/', verifyToken, postController.createPost);
router.get('/:id', verifyToken, postController.getPost);
router.put('/:id', verifyToken, postController.updatePostAuth);
router.get('/', verifyToken, postController.getPostsAuth);
export default router;