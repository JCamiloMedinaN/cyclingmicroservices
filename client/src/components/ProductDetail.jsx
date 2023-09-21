// import { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProductDetail = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const { isAdmin } = useAuth();
//     const navigate = useNavigate(); // Utiliza useNavigate para la redirección

//     useEffect(() => {
//         Axios.get(`http://localhost:4002/api/products/${productId}`, {
//             withCredentials: true,
//         })
//             .then((response) => {
//                 setProduct(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error al obtener detalles del producto:', error);
//             });
//     }, [productId]);

//     const handleDelete = () => {
//         Axios.delete(`http://localhost:4002/api/products/${productId}`, {
//             withCredentials: true,
//         })
//             .then(() => {
//                 // Producto eliminado con éxito, redirige al usuario a la lista de productos
//                 navigate('/productlist');
//             })
//             .catch((error) => {
//                 console.error('Error al eliminar el producto:', error);
//             });
//     };

//     if (!product) {
//         return <div>Cargando...</div>;
//     }

//     return (
//         <div className='flex-nowrap items-center justify-center mx-80 mt-24'>
//             <div className='flex justify-between'>
//                 <div className='w-1/3'>
//                     <img src={product.image} alt={product.name} className='h-96 w-full object-contain rounded-md' />
//                 </div>
//                 <div className='w-2/3 pl-32'>
//                     <div className='flex'>
//                         <h1 className='font-bold text-3xl'>
//                             {product.name}
//                         </h1>
//                         <p className='ml-1 font-bold text-color-button-create'>
//                             Stock {product.stock}
//                         </p>
//                     </div>

//                     <p className='w-auto my-3'>
//                         Descripción: {product.description}
//                     </p>
//                     <p className='font-bold text-xl'>
//                         Precio {product.price}
//                     </p>
//                     <button
//                         className="flex items-center rounded-md bg-color-secondary px-5 py-2.5 text-center text-sm font-medium text-color-primary hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="mr-2 h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                             />
//                         </svg>
//                         Agregar al Carrito
//                     </button>

//                     {isAdmin && (
//                         <div className='flex mt-5'>
//                             <button
//                                 onClick={() => navigate(`/editproduct/${productId}`)}
//                                 className="bg-color-secondary w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
//                             >
//                                 Editar
//                             </button>


//                             <button
//                                 onClick={handleDelete} // Llama a la función de eliminación al hacer clic en "Eliminar"
//                                 className="bg-color-button-delete w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded"
//                             >
//                                 Eliminar
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`http://localhost:4002/api/products/${productId}`, {
            withCredentials: true,
        })
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener detalles del producto:', error);
            });
    }, [productId]);

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

    if (!product) {
        return <div className="text-center mt-16">Cargando...</div>;
    }

    return (
        <div className='flex-nowrap items-center justify-center mx-4 sm:mx-8 md:mx-16 mt-8 sm:mt-16 lg:mt-24'>
            <div className='flex flex-col sm:flex-row justify-center w-full px-4 sm:px-8 md:px-12 lg:px-16'>
                <div className='w-full sm:w-1/2'>
                    <img src={product.image} alt={product.name} className='h-80 w-full object-contain rounded-md' />
                </div>
                <div className='w-full sm:w-1/2 px-4 sm:px-8 mt-4 sm:mt-0'>
                    <div className='flex items-center'>
                        <h1 className='font-bold text-lg sm:text-2xl lg:text-3xl'>
                            {product.name}
                        </h1>
                        <p className='ml-1 font-bold text-color-button-create'>
                            Stock {product.stock}
                        </p>
                    </div>

                    <p className='my-2 text-sm sm:text-base'>
                        Descripción: {product.description}
                    </p>
                    <p className='font-bold text-base sm:text-lg lg:text-xl'>
                        Precio {product.price}
                    </p>
                    <button
                        className="flex items-center rounded-md bg-color-secondary px-4 py-2 text-sm sm:text-base lg:text-lg  text-color-primary hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4"
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

                    {isAdmin && (
                        <div className='flex mt-5'>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
