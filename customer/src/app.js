import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())

// app.use((req, res, next) => {
//   console.log('Solicitud recibida en Customer 4001:', req.url)
//   if (req.is('json')) {
//     console.log('Datos JSON recibidos:', req.body)
//   }
//   next()
// })

app.use(morgan('dev'))

app.use('/api', authRoutes)

export default app