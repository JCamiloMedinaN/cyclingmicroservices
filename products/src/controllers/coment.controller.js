import Comment from '../models/coment.model.js';
import mongoose from 'mongoose';
import axios from 'axios';
import { getUserModel } from '../routes/products.routes.js'


// async function getUserInfo(userId) {
//     try {
//         const response = await axios.get(`http://localhost:4001/user-model/${userId}`);
//         return response.data;
//     } catch (error) {
//         // Maneja el error apropiadamente
//         console.error('Error al obtener información del usuario:', error);
//         return null;
//     }
// }

// function isValidProductId(productId) {
//     if (!productId) {
//         console.log('productId no proporcionado');
//         return false;
//     }

//     // Utiliza el método isValid de mongoose.Types.ObjectId para validar el formato
//     if (mongoose.Types.ObjectId.isValid(productId)) {
//         console.log('productId válido:', productId);
//         return true;
//     } else {
//         console.log('productId no válido:', productId);
//         return false;
//     }
// }

// // Obtener comentarios de un producto por su ID
// export async function getCommentsByProduct(req, res) {
//     try {
//         // Aquí puedes llamar la función para obtener el modelo de usuario
//         getUserModel();
//         const productId = req.params.id;

//         // Validar productId antes de realizar la consulta
//         if (!isValidProductId(productId)) {
//             return res.status(400).json({ error: 'El productId no es válido.' });
//         }

//         const fetchedComments = await Comment.find({ productId: productId }).populate({
//             path: 'userId',
//             model: User, // Utiliza el modelo 'User' importado
//             select: 'username', // Selecciona los campos que necesites del modelo de usuario
//         });

//         // Realizar la consulta a la base de datos
//         const comments = await Comment.find({ productId: productId }).populate('userId');

//         // Si no se encuentran comentarios, devolver un error 404
//         if (comments.length === 0) {
//             return res.status(404).json({ error: 'No se encontraron comentarios para el producto especificado.' });
//         }

//         // Devolver los comentarios
//         res.json(comments);
//     } catch (error) {
//         // Manejar otros errores
//         console.error('Error al obtener comentarios:', error)
//         res.status(500).json({ error: 'Error al obtener comentarios' });
//     }
// }

async function getUserInfo(userId) {
    try {
        const response = await axios.get(`http://localhost:4001/user-model/${userId}`);
        return response.data;
    } catch (error) {
        // Maneja el error apropiadamente
        console.error('Error al obtener información del usuario:', error);
        return null;
    }
}

function isValidProductId(productId) {
    if (!productId) {
        console.log('productId no proporcionado');
        return false;
    }

    // Utiliza el método isValid de mongoose.Types.ObjectId para validar el formato
    if (mongoose.Types.ObjectId.isValid(productId)) {
        console.log('productId válido:', productId);
        return true;
    } else {
        console.log('productId no válido:', productId);
        return false;
    }
}

// Obtener comentarios de un producto por su ID
export async function getCommentsByProduct(req, res) {
    try {
        const productId = req.params.id;

        // Validar productId antes de realizar la consulta
        if (!isValidProductId(productId)) {
            return res.status(400).json({ error: 'El productId no es válido.' });
        }

        // Aquí puedes llamar la función para obtener el modelo de usuario
        const userModel = await getUserModel();

        const fetchedComments = await Comment.find({ productId: productId }).populate({
            path: 'userId',
            model: userModel, // Utiliza el modelo de usuario obtenido
            select: 'username', // Selecciona los campos que necesites del modelo de usuario
        });

        // Si no se encuentran comentarios, devolver un error 404
        if (fetchedComments.length === 0) {
            return res.status(404).json({ error: 'No se encontraron comentarios para el producto especificado.' });
        }

        // Devolver los comentarios
        res.json(fetchedComments);
    } catch (error) {
        // Manejar otros errores
        console.error('Error al obtener comentarios:', error)
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
}

//--------------------------------------------------------------------
// export async function getCommentsByProduct(req, res) {
//     try {
//         const productId = req.params.productId;
//         const comments = await Comment.find({ productId: productId }).populate('userId');
//         res.json(comments);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener comentarios' });
//     }
// }


// ----------------------------------------------------------------
// export async function createComment(req, res) {
//     try {
//         const { productId, userId, text } = req.body;

//         if (!productId || !userId) {
//             return res.status(400).json({ error: 'Los campos productId y userId son obligatorios.' });
//         }

//         const comment = new Comment({ productId, userId, text });
//         await comment.save();
//         res.status(201).json(comment);
//     } catch (error) {
//         console.error('Error al agregar comentario:', error);
//         res.status(500).json({ error: 'Error al agregar comentario' });
//     }
// }


export async function createComment(req, res) {
    try {
        const { productId, userId, text } = req.body;

        // Validación de datos
        if (!productId || !userId || !text) {
            return res.status(400).json({ error: 'Los campos productId, userId y text son obligatorios.' });
        }

        // Validación adicional, por ejemplo, verificar que userId y productId sean ObjectId válidos
        if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Los campos productId y userId no son válidos.' });
        }

        const comment = new Comment({ productId, userId, text });
        await comment.save();

        // Registro (log) de la acción
        console.log(`Comentario creado: ${comment._id}`);

        return res.status(201).json(comment);
    } catch (error) {
        console.error('Error al agregar comentario:', error);

        if (error.name === 'ValidationError') {
            // Validación detallada de campos
            const validationErrors = {};
            for (const field in error.errors) {
                validationErrors[field] = error.errors[field].message;
            }
            return res.status(400).json({ error: 'Error de validación', validationErrors });
        }

        return res.status(500).json({ error: 'Error interno al agregar comentario' });
    }
}
