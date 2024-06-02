import express from 'express';
import dataController from '../controllers/data.controller.js';

import protectRoute from '../middlewares/protect.route.js';

const router = express.Router();

router.post('/add', protectRoute, dataController.add);  
router.post('/remove', dataController.remove);  
router.get('/all', protectRoute, dataController.getAll);


export default router;