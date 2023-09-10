import express from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
app.use(cors())
app.use(express.json())

app.listen(4000, () => {
    console.log('Gateway esta escuchando por el puerto', 4000)
})

app.use('/', (req, res) => {
	const requestData = req.body
	createProxyMiddleware({
			target: 'http://localhost:4001/',
			changeOrigin: true,
			onProxyReq(proxyReq) {
					if (requestData) {
							proxyReq.setHeader('content-type', 'application/json')
							proxyReq.write(JSON.stringify(requestData))
							proxyReq.end()
					}
			}
	})(req, res)
})

// app.use('/api/', proxy('http://localhost:4002')) //products