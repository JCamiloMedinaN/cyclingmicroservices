import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
// Colocar después el authRequired en las rutas no públicas
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js'
import { createComment, getCommentsByProduct } from '../controllers/coment.controller.js'

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
// Ruta para obtener productos con paginación y filtros
router.get('/products/category/:category', getProducts)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

// Rutas para comentarios
router.post('/products/:id/comments', createComment)
router.get('/products/:id/comments', getCommentsByProduct)

export default router