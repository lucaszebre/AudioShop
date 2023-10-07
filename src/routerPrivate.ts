import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { createProduct, deleteProduct, updateProduct } from './handlers/product'
import { createOrder, deleteOrder, getOneOrder, getOrders, updateOrder } from './handlers/order'
import { createReview, deleteReview, getOneReview, getReviews } from './handlers/review'
import { createOrderItem , deleteOrderItem, getOneOrderItem,getOrderItems } from './handlers/orderItem'
import { handleInputErrors } from './modules/middleware'
import {
  addItemToCart,
  getUserCart,
  updateCartItem,
  removeItemFromCart,
  clearUserCart
  // Ensure these handlers are implemented and exported in your `./handlers/cart` file
} from './handlers/cart';
import { Admin } from './modules/middleware'

const router = Router()

/**
 * Product working
 */
router.put('/product/:id',Admin, body('name').isString(),body('description').isString(),body('price').isFloat(),body('stock').isInt(), handleInputErrors, updateProduct)
router.post('/product',Admin, body('name').isString(),body('description').isString(),body('price').isFloat(),body('stock').isInt(), handleInputErrors, createProduct)
router.delete('/product/:id',Admin, deleteProduct)

/**
 * Order working
 */

router.get('/order', getOrders)
router.get('/order/:id', getOneOrder)
router.put('/order/:id', 
  body('price').optional(),
  body('orderStatus').optional(),
  body('method').optional(), handleInputErrors,updateOrder)
router.post('/order',
  body('price').exists().isFloat(),
  body('orderStatus').exists().isString(),
  body('method').exists().isString(), handleInputErrors,
  createOrder
)
router.delete('/order/:id',Admin, deleteOrder)
/*
* OrderItem
 */
router.get('/orderitem', getOrderItems);
router.get('/orderitem/:id', getOneOrderItem);
router.post('/orderitem',
  body('orderId').isString(),
  body('productId').isString(),
  body('quantity').isInt(),
  body('price').isFloat(), handleInputErrors,
  createOrderItem
);
router.delete('/orderitem/:id',Admin, deleteOrderItem);

/**
 * Review working
 */
router.get('/review', getReviews);
router.get('/review/:id', getOneReview);
router.post('/review', 
  body('productId').isString(),
  body('rating').isInt(),
  body('text').isString(),handleInputErrors,
  createReview
);
router.delete('/review/:id',Admin, deleteReview);


/**
 * Cart
 */
router.get('/cart', getUserCart);
router.post('/cart',
  body('productId').isString(),
  body('quantity').isInt(), handleInputErrors,
  addItemToCart
);
router.put('/cart/:cartId',
  body('quantity').isInt().optional(), handleInputErrors,
  updateCartItem
);
router.delete('/cart/:cartId', removeItemFromCart);
router.delete('/cart/clear', clearUserCart);


export default router;