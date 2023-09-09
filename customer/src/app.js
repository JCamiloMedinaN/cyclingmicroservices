import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'


const app = express()


//---------------- Configuración de CORS ---------------------
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
//   });
//------------------------------------------------------------
// app.use(cors())
// const cors = (req, res, next) => {
//     res.header(`Access-Control-Allow-Origin`, `http://localhost:5173/`)
//     next()
// }
app.use(cors({
    origin: '*',
    credentials: true,
}))
// app.use(cors({
//     origin:'http://localhost:5173/',
//     credentials: true
// }))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes);



export default app



