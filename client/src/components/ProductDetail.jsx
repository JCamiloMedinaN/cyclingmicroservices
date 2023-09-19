//-----------------FUNCIONAL -> SOLO MUESTRA EL PRODUCTO A DETALLE-----------------------------------------------------------------
// import { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ProductDetail = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);

//     useEffect(() => {
//         // Realiza una solicitud HTTP para obtener los detalles del producto en función del productId
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

//     if (!product) {
//         // Puedes mostrar un indicador de carga mientras se obtienen los datos
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
//                         Descripción: {product.description
//                         }
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

//                 </div>
//             </div>
//             <div>


//             </div>
//         </div>
//     );
// };

// export default ProductDetail;
//-----------------FUNCIONAL -> SOLO MUESTRA EL PRODUCTO A DETALLE-----------------------------------------------------------------


//----------------MUESTRA BOTONES EDITAR Y ELIMINAR SOLO CUANDO ES ADMIN----------------------------------------------------------

// import { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

// const ProductDetail = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const { isAdmin } = useAuth(); // Obtiene el estado de administrador desde el contexto de autenticación

//     useEffect(() => {
//         // Realiza una solicitud HTTP para obtener los detalles del producto en función del productId
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

//     if (!product) {
//         // Puedes mostrar un indicador de carga mientras se obtienen los datos
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

//                     {isAdmin && ( // Mostrar los botones solo si el usuario es administrador
//                         <div className='flex'>
//                             <button
//                                 className="flex items-center rounded-md bg-color-secondary px-5 py-2.5 text-center text-sm font-medium text-color-primary hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4"
//                             >
//                                 Editar
//                             </button>

//                             <button
//                                 className="flex items-center rounded-md bg-color-button-delete px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 mt-4 ml-4"
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
//----------------MUESTRA BOTONES EDITAR Y ELIMINAR SOLO CUANDO ES ADMIN----------------------------------------------------------


//----------MUESTRA DETALLES DEL PRODUCTO -> MUESTRA BOTONES EDITAR Y ELIMINAR SOLO CUANDO ES ADMIN -> ELIMNA EL PRODUCTO---------
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { isAdmin } = useAuth();
    const navigate = useNavigate(); // Utiliza useNavigate para la redirección

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
                // Producto eliminado con éxito, redirige al usuario a la lista de productos
                navigate('/productlist');
            })
            .catch((error) => {
                console.error('Error al eliminar el producto:', error);
            });
    };

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='flex-nowrap items-center justify-center mx-80 mt-24'>
            <div className='flex justify-between'>
                <div className='w-1/3'>
                    <img src={product.image} alt={product.name} className='h-96 w-full object-contain rounded-md' />
                </div>
                <div className='w-2/3 pl-32'>
                    <div className='flex'>
                        <h1 className='font-bold text-3xl'>
                            {product.name}
                        </h1>
                        <p className='ml-1 font-bold text-color-button-create'>
                            Stock {product.stock}
                        </p>
                    </div>

                    <p className='w-auto my-3'>
                        Descripción: {product.description}
                    </p>
                    <p className='font-bold text-xl'>
                        Precio {product.price}
                    </p>
                    <button
                        className="flex items-center rounded-md bg-color-secondary px-5 py-2.5 text-center text-sm font-medium text-color-primary hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4"
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
                                className="bg-color-secondary w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
                            >
                                Editar
                            </button>


                            <button
                                onClick={handleDelete} // Llama a la función de eliminación al hacer clic en "Eliminar"
                                className="bg-color-button-delete w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded"
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
//----------MUESTRA DETALLES DEL PRODUCTO -> MUESTRA BOTONES EDITAR Y ELIMINAR SOLO CUANDO ES ADMIN -> ELIMNA EL PRODUCTO---------



// import { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { useParams } from 'react-router-dom';

// // Importa el componente de Comentarios y Calificaciones
// // import Comments from './Coments';

// const ProductDetail = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     // const [comments, setComments] = useState([]); // Estado para comentarios y calificaciones

//     useEffect(() => {
//         // Realiza una solicitud HTTP para obtener los detalles del producto en función del productId
//         Axios.get(`http://localhost:4002/api/products/${productId}`, {
//             withCredentials: true,
//         })
//             .then((response) => {
//                 setProduct(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error al obtener detalles del producto:', error);
//             });

//         // Realiza una solicitud HTTP para obtener los comentarios y calificaciones del producto
//         //     Axios.get(`http://localhost:4002/api/products/${productId}/comments`, {
//         //         withCredentials: true,
//         //     })
//         //         .then((response) => {
//         //             setComments(response.data);
//         //         })
//         //         .catch((error) => {
//         //             console.error('Error al obtener comentarios y calificaciones:', error);
//         //         });
//     }, [productId]);

//     if (!product) {
//         // Puedes mostrar un indicador de carga mientras se obtienen los datos
//         return <div>Cargando...</div>;
//     }

//     return (
// <div className='flex-nowrap items-center justify-center mx-80 mt-24'>
//     {/* ... Tu código para mostrar los detalles del producto ... */}
//     <div className='flex justify-between'>
//         <div className='w-1/3'>
//             <img src={product.image} alt={product.name} className='h-96 w-full object-contain rounded-md' />
//         </div>
//         <div className='w-2/3 pl-32'>
//             <div className='flex'>
//                 <h1 className='font-bold text-3xl'>
//                     {product.name}
//                 </h1>
//                 <p className='ml-1 font-bold text-color-button-create'>
//                     Stock {product.stock}
//                 </p>
//             </div>

//             <p className='w-auto my-3'>
//                 Descripción: {product.description
//                 }
//             </p>
//             <p className='font-bold text-xl'>
//                 Precio {product.price}
//             </p>


//             <button
//                 className="flex items-center rounded-md bg-color-secondary px-5 py-2.5 text-center text-sm font-medium text-color-primary hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4"
//             >
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="mr-2 h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                 </svg>
//                 Agregar al Carrito
//             </button>

//         </div>
//     </div>
//     <div>
//         {/* En el componente ProductDetail, donde renderizas el componente Comments: */}
//         {/* <Comments productId={productId} /> */}

//     </div>
// </div>
//     );
// };


// export default ProductDetail;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Axios from 'axios';

// const ProductDetail = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState({});
//     const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es administrador

//     useEffect(() => {
//         // Realiza una solicitud HTTP para obtener los detalles del producto
//         Axios.get(`http://localhost:4002/api/products/${id}`, {
//             withCredentials: true,
//         })
//             .then((response) => {
//                 setProduct(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error al obtener detalles del producto:', error);
//             });

//         // Verifica si el usuario es administrador (esto debe provenir de tu sistema de autenticación)
//         // Puedes cambiar esta lógica según cómo determines si un usuario es administrador o no
//         const userIsAdmin = /* Lógica para verificar si el usuario es administrador */;
//         setIsAdmin(userIsAdmin);
//     }, [id]);

//     const handleEditProduct = () => {
//         // Redirige a la página de edición del producto
//         window.location.href = `/product/${id}/edit`;
//     };

//     const handleDeleteProduct = () => {
//         // Redirige a la página de eliminación del producto
//         window.location.href = `/product/${id}/delete`;
//     };

//     return (
//         <div className='flex-nowrap items-center justify-center mx-80 mt-24'>
//             {/* ... Tu código para mostrar los detalles del producto ... */}
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
//                         Descripción: {product.description
//                         }
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

//                 </div>
//                 {isAdmin && (
//                     <div>
//                         <button onClick={handleEditProduct}>Editar Producto</button>
//                         <button onClick={handleDeleteProduct}>Eliminar Producto</button>
//                     </div>
//                 )}
//             </div>
//             <div>
//                 {/* En el componente ProductDetail, donde renderizas el componente Comments: */}
//                 {/* <Comments productId={productId} /> */}

//             </div>
//         </div>

//     );
// };

// export default ProductDetail;


