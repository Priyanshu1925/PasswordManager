import express from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

