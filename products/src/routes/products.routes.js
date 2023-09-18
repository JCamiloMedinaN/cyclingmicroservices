import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js'

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', createProduct)
router.delete('/products/:id', deleteProduct)
router.put('/products/:id', updateProduct)

// Nueva ruta para obtener productos con paginación y filtros
router.get('/products/page/:page', getProducts);
router.get('/products/category/:category', getProducts);

export default router