import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product'
import { createOrder, deleteOrder, getOneOrder, getOrders, updateOrder } from './handlers/order'
import { createReview, deleteReview, getOneReview, getReviews } from './handlers/review'
import { createOrderItem , deleteOrderItem, getOneOrderItem,getOrderItems } from './handlers/orderItem'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * Product
 */
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(),body('description').isString(),body('price').isFloat(),body('stock').isInt(), handleInputErrors, updateProduct)
router.post('/product', body('name').isString(),body('description').isString(),body('price').isFloat(),body('stock').isInt(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Order
 */

router.get('/order', getOrders)
router.get('/order/:id', getOneOrder)
router.put('/order/:id', 
  body('userId').isString(),
  body('totalPrice').optional(),
  body('orderStatus').optional(),
  body('paymentMethod').optional(), handleInputErrors,updateOrder)
router.post('/order',
  body('userId').exists().isString(),
  body('totalPrice').exists().isFloat(),
  body('orderStatus').exists().isString(),
  body('paymentMethod').exists().isString(), handleInputErrors,
  createOrder
)
router.delete('/order/:id', deleteOrder)
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
router.delete('/orderitem/:id', deleteOrderItem);

/**
 * Review
 */
router.get('/review', getReviews);
router.get('/review/:id', getOneReview);
router.post('/review', 
  body('productId').isString(),
  body('userId').isString(),
  body('rating').isInt(),
  body('text').isString(),handleInputErrors,
  createReview
);
router.delete('/review/:id', deleteReview);

export default router;