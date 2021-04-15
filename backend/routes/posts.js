import express from 'express';
import { commentPost, createPost, deletePost, getPost, getPosts, likePost, updatePost } from '../controllers/posts.js';
import {protect} from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(protect, getPosts)
    .post(protect, createPost)

router 
    .route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);

router.get('/:id/like',protect, likePost);
router.post('/:id/comment',protect, commentPost);

export default router;