import { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const { user, isAdmin } = useAuth();

  const [commentCount, setCommentCount] = useState({
    excelente: 0,
    aceptable: 0,
    insuficiente: 0,
    deficiente: 0,
    'no clasificado': 0,
  });

  const incrementCommentCount = useCallback((score) => {
    const lowercaseScore = score.toLowerCase();
    const normalizedScore = Object.keys(commentCount).find((key) =>
      key.toLowerCase() === lowercaseScore
    );
    if (normalizedScore) {
      setCommentCount((prevCount) => ({
        ...prevCount,
        [normalizedScore]: prevCount[normalizedScore] + 1,
      }));
    }
  }, [commentCount]);
  
  const handleAddComment = () => {
    if (!comment) {
      alert('Por favor, completa el comentario.');
      return;
    }
    Axios.post(
      `http://localhost:4002/api/products/${productId}/comment`,
      {
        comment,
        author: user.username,
      },
      {
        withCredentials: true,
      }
    )
      .then(() => {
        setComment('');
        setTimeout(() => {
          Axios.get(`http://localhost:4002/api/products/${productId}/comments`, {
            withCredentials: true,
          })
            .then((response) => {
              setComments(response.data);
            })
            .catch((error) => {
              console.error('Error al obtener comentarios:', error);
            });
        }, 1000);
      })
      .catch((error) => {
        console.error('Error al agregar el comentario:', error);
      });
  };

  const getEmotionFromScore = (score) => {
    const lowercaseScore = score.toLowerCase();
    if (lowercaseScore.includes('excelente')) {
      return 'Euforia';
    } else if (lowercaseScore.includes('aceptable')) {
      return 'Satisfacción';
    } else if (lowercaseScore.includes('insuficiente')) {
      return 'Frustración';
    } else if (lowercaseScore.includes('deficiente')) {
      return 'Desilusión';
    } else {
      return 'No clasificado';
    }
  };

  useEffect(() => {
    const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoData);
    Axios.get(`http://localhost:4002/api/products/${productId}`, {
      withCredentials: true,
    })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener detalles del producto:', error);
      });
    Axios.get(`http://localhost:4002/api/products/${productId}/comments`, {
      withCredentials: true,
    })
      .then((response) => {
        setComments(response.data);
        setCommentCount({
          excelente: 0,
          aceptable: 0,
          insuficiente: 0,
          deficiente: 0,
          'no clasificado': 0,
        });
        response.data.forEach((comment) => {
          const lowercaseScore = comment.score.toLowerCase();
          const normalizedScore = Object.keys(commentCount).find((key) =>
            key.toLowerCase() === lowercaseScore
          );
          if (normalizedScore) {
            incrementCommentCount(lowercaseScore);
          }
        });
      })
      .catch((error) => {
        console.error('Error al obtener comentarios:', error);
      });
  }, [productId, commentCount, incrementCommentCount]);

  const handleDelete = () => {
    Axios.delete(`http://localhost:4002/api/products/${productId}`, {
      withCredentials: true,
    })
      .then(() => {
        navigate('/productlist');
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  };

  const actualizarCarritoEnLocalStorage = (carritoData) => {
    localStorage.setItem('carrito', JSON.stringify(carritoData));
  };

  const agregarAlCarrito = (item) => {
    item.cantidad = 1;
    item.valortotal = item.price * item.cantidad;
    const updatedCarrito = [...carrito, item];
    setCarrito(updatedCarrito);
    actualizarCarritoEnLocalStorage(updatedCarrito);
  };

  if (!product) {
    return <div className="text-center mt-16">Cargando...</div>;
  }

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className='flex-nowrap items-center justify-center mt-14 sm:mx-8 md:mx-16 lg:mx-48 xl:mx-52 2xl:mx-56'>
      <div className='flex sm:flex-wrap justify-center w-full'>
        <div className='w-full md:w-6/6 lg:w-1/2'>
          <img src={product.image} alt={product.name} className='h-80 w-full object-contain rounded-md' />
        </div>
        <div className='w-full ml-4 lg:w-1/2 sm:mt-4'>
          <div className='flex items-center'>
            <h1 className='font-bold sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl'>
              {product.name}
            </h1>
            <p className='ml-1 font-bold text-color-button-create'>
              Stock {product.stock}
            </p>
          </div>

          <p className='my-2  sm:text-base'>
            Descripción: {product.description}
          </p>
          <p className='font-bold text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-xl'>
            Precio {product.price}
          </p>
          <button
            className="flex items-center rounded-md bg-color-secondary px-4 py-2 text-sm sm:text-base lg:text-lg  text-color-primary hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4"
            onClick={() => agregarAlCarrito(product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Agregar al Carrito
          </button>

          <div className='flex mt-5'>
            {isAdmin && (
              <>
                <button
                  onClick={() => navigate(`/editproduct/${productId}`)}
                  className="bg-color-secondary w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-4 text-sm sm:text-base lg:text-lg xl:text-xl"
                >
                  Editar
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-color-button-delete w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded text-sm sm:text-base lg:text-lg xl:text-xl"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-wrap justify-center w-full'>
        <div className='flex flex-col mt-5 w-5/6 ml-4 lg:w-1/2 sm:mt-4'>
          <textarea
            id='comment'
            name='comment'
            placeholder='Agregar Comentario'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows='2'
            className='resize-none w-auto border rounded-md p-2 mt-6'
          ></textarea>
          <button
            onClick={handleAddComment}
            className='bg-color-secondary mt-2 px-4 py-2 rounded text-color-primary w-60 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Agregar Comentario
          </button>
        </div>

        <div className='mt-5 mb-16 w-5/6 ml-4 lg:w-1/2 sm:mt-4'>
          <h2 className='font-bold text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-xl mb-5'>Comentarios</h2>

          <div className='mb-3'>
            {Object.entries(commentCount)
              .sort(([, countA], [, countB]) => countB - countA)
              .filter(([, count]) => count > 0)
              .map(([score, count]) => (
                <span className="border rounded-md py-1 px-1.5 inline-block text-color-primary bg-color-third mr-1 mb-1" key={score}>
                  <strong>Score {capitalize(score)}:</strong> {count}{' '}
                  {score.toLowerCase() !== 'no clasificado' && `- ${getEmotionFromScore(score)}`}
                </span>
            ))}
          </div>

          <ul>
            {comments.slice(0).reverse().map((comment, index) => (
              <li key={index} className='mb-3'>
                <p><strong>{comment.author}</strong> </p>
                <p>{comment.text}</p>
                <p className='border rounded-md py-1 px-1.5 inline-block text-color-primary bg-color-third mr-1 mb-1'>Score: {comment.score}</p>
                <p className='border rounded-md py-1 px-1.5 inline-block text-color-primary bg-color-third'>Emoción: {getEmotionFromScore(comment.score)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
