import { Router } from 'express';
import { handleResponse } from '../controllers/chat.controller.js';

const router = Router();

router.post('/assistant', handleResponse);

export default router;
