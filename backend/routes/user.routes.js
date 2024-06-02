import express from 'express';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);


import userRoutes from '../controllers/user.controller.js';

const router = express.Router();

router.get('/home', (req, res) => {
    const filePath = path.join(__dirname.slice(1), '..' , 'frontend', 'login.html');
    res.sendFile(filePath.replace(/\\/g, '/'));
});

router.post('/signup', userRoutes.signup);
router.post('/login', userRoutes.login);
router.post('/logout', userRoutes.logout);

export default router;
