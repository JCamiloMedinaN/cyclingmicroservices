import Comment from '../models/coment.model.js';

// Obtener comentarios de un producto por su ID
export async function getCommentsByProduct(req, res) {
    try {
        const productId = req.params.productId;
        const comments = await Comment.find({ productId }).populate('userId');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
}

// Agregar un nuevo comentario a un producto
export async function createComment(req, res) {
    try {
        const { productId, userId, text } = req.body;
        const comment = new Comment({ productId, userId, text });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar comentario' });
    }
}