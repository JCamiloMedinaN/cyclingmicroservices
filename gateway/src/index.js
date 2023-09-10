import express from 'express'
import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/', createProxyMiddleware({
  target: 'http://localhost:4001/',
  changeOrigin: true,
  onProxyReq(proxyReq) {
    proxyReq.end()
  }
}))

app.listen(4000, () => {
  console.log('Gateway Server on port', 4000)
})

// app.use('/api/', proxy('http://localhost:4002')) //products