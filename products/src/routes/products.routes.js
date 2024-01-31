import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, realizarCompra } from '../controllers/products.controller.js'
import { createComment, getAllComments } from '../controllers/products.controller.js';
import axios from 'axios'

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', getProduct)

router.get('/products/category/:category', getProducts)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

router.post('/realizar-compra', realizarCompra);

router.post('/products/:id/comment', createComment);
router.get('/products/:id/comments', getAllComments);

export async function getUserModel() {
  try {
    const response = await axios.get('http://localhost:4001/user-model');
    console.log('User model:', response.data);
  } catch (error) {
    console.error('Error fetching user model:', error);
  }
}

getUserModel();

export default router
