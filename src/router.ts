import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product'
import { createOrder, deleteOrder, getOneOrder, getOrders } from './handlers/order'
import { createreview, deleteReview, getOneReview, getReviews } from './handlers/review'
import { createOrderItem , deleteOrderItem, getOneOrderItem,getOrderItems } from './handlers/orderItem'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * Product
 */
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {
  
})
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Order
 */

router.get('/order', getOrders)
router.get('/order/:id', getOneOrder)
router.put('/order/:id', 
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  
)
router.post('/order',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createOrder
)
router.delete('/order/:id', deleteOrder)
/*
* OrderItem
 */
router.get('/orderitem', getOrderItems);
router.get('/orderitem/:id', getOneOrderItem);
router.post('/orderitem',
  body('name').isString(),
  body('description').isString(),
  body('orderId').exists().isString(),
  createOrderItem
);
router.delete('/orderitem/:id', deleteOrderItem);

/**
 * Review
 */
router.get('/review', getReviews);
router.get('/review/:id', getOneReview);
router.post('/review', 
  body('name').isString(),
  body('description').isString(),
  body('productId').exists().isString(),
  createreview
);
router.delete('/review/:id', deleteReview);

export default router;