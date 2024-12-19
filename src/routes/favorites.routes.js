import { Router } from 'express';
import {
    createFavoriteRecipe,
    getAllFavoriteRecipes,
    deleteFavoriteRecipe,
} from '../controllers/favorites.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/favorites', auth, createFavoriteRecipe);
router.get('/favorites', auth, getAllFavoriteRecipes);
router.delete('/favorites/:id', auth, deleteFavoriteRecipe);

export default router;
