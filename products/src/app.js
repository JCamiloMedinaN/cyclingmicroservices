import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import categoriesRoutes from './routes/categories.routes.js'
import productsRoutes from './routes/products.routes.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())

// Solo en desarrollo
app.use((req, res, next) => {
  console.log('Tipo de solicitud recibida:', req.method)
  console.log('Solicitud recibida en Products 4002:', req.url)
  if (req.is('json')) {
    console.log('Datos JSON recibidos:', req.body)
  }
  next()
})

app.use('/api', categoriesRoutes)
app.use('/api', productsRoutes)

// Manejador de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
})

export default app