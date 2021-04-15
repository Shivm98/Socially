// Create a post
// post a picture
// like on a post
// comment on a post
// share a post
// follow a user
// unfollow a user

import express from 'express';
import {protect} from '../middleware/auth.js';
import { getMe, login, register } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getme',protect, getMe);

export default router;