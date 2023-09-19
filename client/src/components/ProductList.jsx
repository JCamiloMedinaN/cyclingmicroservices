import { Link } from 'react-router-dom'

const ProductList = ({ products }) => {
    return (
        <div className='grid grid-cols-3 mx-60'>
            {products.map((product) => (
                <div key={product._id}>
                    {/* Agrega un enlace a la página de detalles del producto */}
                    <Link to={`/product/${product._id}`} className="block">
                        <div className='relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-2xl'>
                            <img src={product.image} alt={product.name} className='h-60 w-full object-contain rounded-t-lg' />
                            <div className=' px-6 py-4'>
                                <div>
                                    <h2 className='text-xl font-semibold tracking-tight text-slate-900'>{product.name}</h2>
                                    {/* <p className='text-gray-700 text-base'>{product.description}</p> */}
                                    <p className='text-3 font-semibold text-slate-900'>Precio: {product.price}</p>
                                </div>
                                <div className='flex justify-center items-center mt-2'>
                                    <button
                                        className="flex items-center rounded-md bg-color-secondary px-5 py-2.5 text-center text-sm font-medium text-color-primary hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
                                </div>

                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ProductList;