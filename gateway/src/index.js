import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

// Ruta las solicitudes a '/' al puerto 4001 (por defecto)
app.use('/',
  createProxyMiddleware({
    target: 'http://localhost:4001/',
    changeOrigin: true
  }))

// Ruta las solicitudes a '/products' al microservicio en el puerto 4002
app.use('/products',
  createProxyMiddleware({
    target: 'http://localhost:4002/',
    changeOrigin: true
  }))

app.listen(4000, () => {
  console.log('Gateway Server on port', 4000)
})

// app.use('/api/', proxy('http://localhost:4002')) //products
