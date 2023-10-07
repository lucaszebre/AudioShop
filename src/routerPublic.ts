// publicRouter.js
import { Router } from 'express';
import { createNewUser, signin } from './handlers/user';
import { getProducts,getOneProduct } from './handlers/product';

const router = Router();

router.post('/register', createNewUser);
router.post('/login', signin);
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);

export default router;