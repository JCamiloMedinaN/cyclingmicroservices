import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  console.log('Solicitud recibida en el proyecto "customer":', req.url)
  if (req.is('json')) {
    console.log('Datos JSON recibidos:', req.body)
  }
  next()
})

app.use(cors())
app.use(morgan('dev'))

app.use(cookieParser())
app.use('/api', authRoutes)

export default app