import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);

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

// const enviarCarritoAComponenteHijo = () => {
//     // Aquí pasamos el estado carrito a ComponenteHijo
//     // Utilizamos un estado local para actualizar las props
//     setCarrito([...carrito]);
//   };

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

return (
    <div className='flex-nowrap items-center justify-center  mt-14 sm:mx-8 md:mx-16 lg:mx-48 xl:mx-52 2xl:mx-56'>
        <div className='flex  sm:flex-wrap justify-center w-full'>
            <div className='w-full md:w-6/6 lg:w-1/2'>
                <img src={product.image} alt={product.name} className='h-80 w-full object-contain rounded-md' />
            </div>
            <div className='w-full ml-4 lg:w-1/2 sm:mt-4 '>
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

                {isAdmin && (
                    <div className='flex mt-5'>
                        <button
                            onClick={() => navigate(`/editproduct/${ productId }`)}
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







// import { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Comments from './Coments';

// const ProductDetail = () => {
//     const { productId } = useParams()
//     const [product, setProduct] = useState(null)
//     const [userId, setUserId] = useState(null)
//     const { isAdmin } = useAuth()
//     const navigate = useNavigate()

//     useEffect(() => {
//         Axios.get(`http://localhost:4002/api/products/${productId}`, {
//             withCredentials: true,
//         })
//             .then((response) => {
//                 setProduct(response.data);
//                 setUserId(response.data.userId)
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
//                 navigate('/productlist');
//             })
//             .catch((error) => {
//                 console.error('Error al eliminar el producto:', error);
//             });
//     };

//     if (!product) {
//         return <div className="text-center mt-16">Cargando...</div>;
//     }

//     return (
//         <div className='flex-nowrap items-center justify-center  mt-14 sm:mx-8 md:mx-16 lg:mx-48 xl:mx-52 2xl:mx-56'>
//             <div className='flex  sm:flex-wrap justify-center w-full'>
//                 <div className='w-full md:w-6/6 lg:w-1/2'>
//                     <img src={product.image} alt={product.name} className='h-80 w-full object-contain rounded-md' />
//                 </div>
//                 <div className='w-full ml-4 lg:w-1/2 sm:mt-4 '>
//                     <div className='flex items-center'>
//                         <h1 className='font-bold sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl'>
//                             {product.name}
//                         </h1>
//                         <p className='ml-1 font-bold text-color-button-create'>
//                             Stock {product.stock}
//                         </p>
//                     </div>

//                     <p className='my-2  sm:text-base'>
//                         Descripción: {product.description}
//                     </p>
//                     <p className='font-bold text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-xl'>
//                         Precio {product.price}
//                     </p>
//                     <button
//                         className="flex items-center rounded-md bg-color-secondary px-4 py-2 text-sm sm:text-base lg:text-lg  text-color-primary hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4"
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
//                                 className="bg-color-secondary w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-4 text-sm sm:text-base lg:text-lg xl:text-xl"
//                             >
//                                 Editar
//                             </button>

//                             <button
//                                 onClick={handleDelete}
//                                 className="bg-color-button-delete w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded text-sm sm:text-base lg:text-lg xl:text-xl"
//                             >
//                                 Eliminar
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div>
//                 <Comments productId={productId} userId={userId} />
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;
