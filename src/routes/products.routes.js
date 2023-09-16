import { Router } from 'express';
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import {verifyToken} from "categories.routes.js";
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
router.get('/', verifyToken, getProducts);

router.post('/', verifyToken, createProduct);

router.put('/:id', verifyToken, updateProduct);

router.delete('/:id', verifyToken, deleteProduct);

router.get('/:id', verifyToken, getProduct);

export default router;
