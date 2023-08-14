import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/login', {useNewUrlParser: true,
        useUnifiedTopology: true,})
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// const app = express();
// app.use(cors()); // Para manejar las solicitudes CORS

// mongoose.connect('mongodb://127.0.0.1:27017/login', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

//     .then(() => {
//         console.log('Conectado a la base de datos');
//     })
//     .catch((error) => {
//         console.error('Error de conexión:', error);
//     });

// // Definir rutas y controladores aquí
// // Ejemplo:
// app.get('/api/items', async (req, res) => {
//     const items = await Item.find();
//     res.json(items);
// });

// app.listen(3001, () => {
//     console.log('Servidor backend en ejecución en el puerto 3001');
// });