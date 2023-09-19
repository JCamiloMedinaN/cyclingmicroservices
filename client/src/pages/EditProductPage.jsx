//-------------FUNCIONA SIN PREV DE LA IMG-----------------------------------------
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Axios from 'axios';

// const EditProductPage = () => {
//     const { productId } = useParams();
//     const navigate = useNavigate();

//     const [product, setProduct] = useState({
//         name: '',
//         description: '',
//         price: 0,
//         stock: 0,
//         image: '',
//     });

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

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({
//             ...product,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Realiza una solicitud HTTP para actualizar el producto en función del productId
//             await Axios.put(`http://localhost:4002/api/products/${productId}`, product, {
//                 withCredentials: true,
//             });
//             // Redirige al usuario a la página de detalles del producto después de la edición
//             navigate(`/product/${productId}`);
//         } catch (error) {
//             console.error('Error al editar el producto:', error);
//         }
//     };

//     return (
//         <div className="mx-80 mt-24">
//             <h1 className="text-3xl font-bold mb-4">Editar Producto</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block font-bold">
//                         Nombre del Producto:
//                     </label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={product.name}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="description" className="block font-bold">
//                         Descripción:
//                     </label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={product.description}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96 h-32"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="price" className="block font-bold">
//                         Precio:
//                     </label>
//                     <input
//                         type="number"
//                         id="price"
//                         name="price"
//                         value={product.price}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="stock" className="block font-bold">
//                         Stock:
//                     </label>
//                     <input
//                         type="number"
//                         id="stock"
//                         name="stock"
//                         value={product.stock}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="image" className="block font-bold">
//                         URL de la Imagen:
//                     </label>
//                     <input
//                         type="text"
//                         id="image"
//                         name="image"
//                         value={product.image}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96"
//                         required
//                     />
//                 </div>

// <button
//     type="submit"
//     className="bg-color-secondary w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
// >
//     Guardar
// </button>
// <button
//     onClick={() => navigate(`/product/${productId}`)}
//     className="bg-color-button-delete w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
// >
//     Cancelar
// </button>
//             </form>
//         </div>
//     );
// };

// export default EditProductPage;
//-------------FUNCIONA SIN PREV DE LA IMG-----------------------------------------



//-------------------FUNCIONA, PERO NO ME ACUERDO Q TIENE DIFERENTE--------------------------
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Axios from 'axios';

// const EditProductPage = () => {
//     const { productId } = useParams();
//     const navigate = useNavigate();

//     const [product, setProduct] = useState({
//         name: '',
//         description: '',
//         price: 0,
//         stock: 0,
//         image: '',
//     });

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

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({
//             ...product,
//             [name]: value,
//         });
//     };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         // Realiza una solicitud HTTP para actualizar el producto en función del productId
//         await Axios.put(`http://localhost:4002/api/products/${productId}`, product, {
//             withCredentials: true,
//         });
//         // Redirige al usuario a la página de detalles del producto después de la edición
//         navigate(`/product/${productId}`);
//     } catch (error) {
//         console.error('Error al editar el producto:', error);
//     }
// };

//     return (
//         <div className="mx-80 mt-24">
//             <h1 className="text-3xl font-bold mb-4">Editar Producto</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block font-bold">
//                         Nombre del Producto:
//                     </label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={product.name}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="description" className="block font-bold">
//                         Descripción:
//                     </label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={product.description}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96 h-32"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="price" className="block font-bold">
//                         Precio:
//                     </label>
//                     <input
//                         type="number"
//                         id="price"
//                         name="price"
//                         value={product.price}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="stock" className="block font-bold">
//                         Stock:
//                     </label>
//                     <input
//                         type="number"
//                         id="stock"
//                         name="stock"
//                         value={product.stock}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="image" className="block font-bold">
//                         Imagen:
//                     </label>
//                     <img
//                         src={product.image}
//                         alt="Imagen del producto"
//                         className="mb-2 rounded-md w-96"
//                     />
//                     <input
//                         type="text"
//                         id="image"
//                         name="image"
//                         value={product.image}
//                         onChange={handleInputChange}
//                         className="border border-color-input p-2 rounded-md w-96"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-color-secondary w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
//                 >
//                     Guardar
//                 </button>
//                 <button
//                     onClick={() => navigate(`/product/${productId}`)}
//                     className="bg-color-button-delete w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
//                 >
//                     Cancelar
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditProductPage;
//-------------------FUNCIONA, PERO NO ME ACUERDO Q TIENE DIFERENTE--------------------------


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const EditProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: null, // Cambiamos esto a un objeto File
    });

    useEffect(() => {
        // Realiza una solicitud HTTP para obtener los detalles del producto en función del productId
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    // Manejar la selección de archivos
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtener el primer archivo seleccionado
        if (file) {
            setProduct({
                ...product,
                image: file,
            });
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData();
    //         formData.append('name', product.name);
    //         formData.append('description', product.description);
    //         formData.append('price', product.price);
    //         formData.append('stock', product.stock);
    //         formData.append('image', product.image); // Agregar la imagen al FormData

    //         // Realiza una solicitud HTTP para actualizar el producto en función del productId
    //         await Axios.put(`http://localhost:4002/api/products/${productId}`, formData, {
    //             withCredentials: true,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data', // Establecer el encabezado correcto
    //             },
    //         });
    //         // Redirige al usuario a la página de detalles del producto después de la edición
    //         navigate(`/product/${productId}`);
    //     } catch (error) {
    //         console.error('Error al editar el producto:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Datos del producto:', product);
            // Realiza una solicitud HTTP para actualizar el producto en función del productId
            await Axios.put(`http://localhost:4002/api/products/${productId}`, product, {
                withCredentials: true,
            });
            // Redirige al usuario a la página de detalles del producto después de la edición
            navigate(`/product/${productId}`);
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    return (
        <div className="mx-80 mt-24">
            <h1 className="text-3xl font-bold mb-4">Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-bold">
                        Nombre del Producto:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        className="border border-color-input p-2 rounded-md w-96"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-bold">
                        Descripción:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        className="border border-color-input p-2 rounded-md w-96 h-32"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-bold">
                        Precio:
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        className="border border-color-input p-2 rounded-md w-96"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block font-bold">
                        Stock:
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleInputChange}
                        className="border border-color-input p-2 rounded-md w-96"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block font-bold">
                        Imagen:
                    </label>
                    {product.image && typeof product.image !== 'string' && (
                        <img
                            src={URL.createObjectURL(product.image)}
                            alt="Imagen del producto"
                            className="mb-2 rounded-md w-96"
                        />
                    )}
                    <input
                        type="file"
                        id="image"
                        name="image" // Asegúrate de tener el atributo name configurado
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border border-color-input p-2 rounded-md w-96"
                    />

                </div>

                <div className='mb-10'>
                    <button
                        type="submit"
                        className="bg-color-secondary w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
                    >
                        Guardar
                    </button>
                    <button
                        onClick={() => navigate(`/product/${productId}`)}
                        className="bg-color-button-delete w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
                    >
                        Cancelar
                    </button>
                </div>

            </form>
        </div>
    );
};

export default EditProductPage;
