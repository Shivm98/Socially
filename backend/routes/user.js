import express from 'express';
import { followUser, getUserProfile, searchUser, unFollowUser } from '../controllers/user.js';
import {protect} from '../middleware/auth.js';

const router = express.Router();

router.get('/:id/follow', protect, followUser);
router.get('/:id/unfollow', protect, unFollowUser);
router.get('/:id/', getUserProfile);
router.get('/', searchUser);

export default router;