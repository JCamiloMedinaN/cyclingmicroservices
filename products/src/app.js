import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import productsRoutes from './routes/products.routes.js'
import categoriesRoutes from './routes/categories.routes.js'


const app = express()

//-----------------------------------------------------
app.use(cors({
    origin: '*',
    credentials: true,
  }));
  
  app.get('/api/login', (req, res) => {
    // Procesa la petición
  });
//-----------------------------------------------------


// app.use(cors({
//     origin: '*',
//     credentials: true,
//   }));
// app.use(cors({
//     origin:'http://localhost:5173/', 
//     credentials: true
// }))

app.use(express.json())
app.use(cookieParser())

app.use('/api', productsRoutes)
app.use('/api', categoriesRoutes)



export default app
