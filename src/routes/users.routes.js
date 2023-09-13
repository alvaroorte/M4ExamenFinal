import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserCategories,
  getUsersCategories,
} from '../controllers/user.controller.js';

const router = Router();

// Routes
router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/:id/categories', getUserCategories);

router.get('/all/categories/all', getUsersCategories);

export default router;
