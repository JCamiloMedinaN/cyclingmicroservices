import express from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'

const app = express()

app.use(cors())
app.use(express.json())


app.use(cors({
    origins: ["localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
}));

// app.use(cors({
//     origin: '*',
//     credentials: true,
// }));
// app.use(cors({
//     origin: 'http://localhost:5173/',
//     credentials: true
// }))

app.use('/api/customer', proxy('http://localhost:4001'))
app.use('/api/', proxy('http://localhost:4002')) //products

app.listen(4000, () => {
    console.log('Gateway esta escuchando por el puerto:4000')
})