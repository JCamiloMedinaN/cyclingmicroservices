import { Router } from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js'
import { createComment, getCommentsByProduct } from '../controllers/coment.controller.js'

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', createProduct)
router.delete('/products/:id', deleteProduct)
router.put('/products/:id', updateProduct)

// Nueva ruta para obtener productos con paginación y filtros
router.get('/products', getProducts);
router.get('/products/category/:category', getProducts);
// Rutas para comentarios
router.post('/products/:id/comments', createComment)
router.get('/products/:id/comments', getCommentsByProduct)

export default router