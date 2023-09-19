import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de importar tu AuthContext correctamente

const Comments = ({ productId }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Realiza una solicitud HTTP para obtener los comentarios del producto
        Axios.get(`http://localhost:4002/api/products/${productId}/comments`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener comentarios:', error);
            });
    }, [productId]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handlePostComment = () => {
        if (!newComment) {
            setError('El comentario no puede estar vacío.');
            return;
        }

        // Realiza una solicitud HTTP para agregar un nuevo comentario
        Axios.post(
            `http://localhost:4002/api/products/${productId}/comments`,
            { text: newComment },
            { withCredentials: true } // Asegúrate de incluir las credenciales en la solicitud si es necesario
        )
            .then((response) => {
                // Agrega el nuevo comentario a la lista de comentarios
                setComments([...comments, response.data]);
                setNewComment('');
                setError('');
            })
            .catch((error) => {
                console.error('Error al publicar el comentario:', error);
                setError('Error al publicar el comentario.');
            });
    };

    return (
        <div>
            <h2>Comentarios</h2>

            {/* Mostrar los comentarios existentes */}
            {comments.map((comment) => (
                <div key={comment._id}>
                    <p>
                        <strong>{comment.userId.username}</strong>: {comment.text}
                    </p>
                </div>
            ))}

            {/* Formulario para agregar un nuevo comentario */}
            {isAuthenticated && (
                <div>
                    <textarea
                        rows="4"
                        cols="50"
                        placeholder="Escribe tu comentario aquí..."
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <button onClick={handlePostComment}>Publicar Comentario</button>
                    {error && <p>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default Comments;




