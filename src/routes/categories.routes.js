import { Router } from 'express';
import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const bearer = req.headers['authorization'];
  console.log('bearer:  '+bearer);
  if ( typeof bearer !== 'undefined' ) {
    const token = bearer.split(' ')[1];
    console.log('token:   '+token);
    jwt.verify(token, 'secretkey', (err, user) => {
      if (err) res.sendStatus(401)
      else {
        next();
      }
    })
  } else res.sendStatus(401)
}

const router = Router();

// Routes
router.get('/',verifyToken, getCategories);

router.post('/', verifyToken,  createCategory);

router.put('/:id', verifyToken,  updateCategory);

router.delete('/:id', verifyToken,  deleteCategory);

router.get('/:id', verifyToken,  getCategory);

export default router;
