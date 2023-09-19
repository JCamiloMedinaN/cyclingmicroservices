import { useState, useEffect } from 'react'
import axios from 'axios'

function CreateProductPage({ onSubmit }) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState(null)
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [categoria, setCategoria] = useState('')
    const [errorNombre, setErrorNombre] = useState('')
    const [errorDescripcion, setErrorDescripcion] = useState('')
    const [errorImagen, setErrorImagen] = useState('')
    const [errorPrice, setErrorPrice] = useState('')
    const [errorStock, setErrorStock] = useState('')
    const [errorCategoria, setErrorCategoria] = useState('')
    const [errorForm, setErrorForm] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [categorias, setCategorias] = useState([])

    // Función para cargar las categorías existentes
    const loadCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:4002/api/categories', { withCredentials: true })
            setCategorias(response.data)
        } catch (error) {
            console.error('Error al cargar las categorías:', error)
        }
    }

    useEffect(() => {
        loadCategorias()
    }, [])

    const handleNombreChange = (event) => {
        setNombre(event.target.value)
        setErrorNombre(event.target.value.length < 4 ? 'El nombre debe tener al menos 4 letras' : '')
    }

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value)
    }

    const handleImagenChange = (event) => {
        setImagen(event.target.files[0])
        setErrorImagen(event.target.files.length === 0 ? 'Por favor, seleccione una imagen' : '')
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value)
        setErrorPrice(event.target.value === '' ? 'Por favor, ingrese el precio' : '')
    }

    const handleStockChange = (event) => {
        setStock(event.target.value)
        setErrorStock(event.target.value === '' ? 'Por favor, ingrese el stock' : '')
    }

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value)
        setErrorCategoria(event.target.value === '' ? 'Por favor, seleccione una categoría' : '')
    }

    const displaySuccessMessage = (message) => {
        setSuccessMessage(message)
        setTimeout(() => {
            setSuccessMessage('')
        }, 2000)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (nombre.length < 4 || descripcion.length < 4 || !imagen || price === '' || stock === '' || categoria === '') {
            setErrorForm('Por favor, complete todos los campos')
            return
        }

        setIsLoading(true)

        const formData = new FormData()
        formData.append('name', nombre)
        formData.append('description', descripcion)
        formData.append('image', imagen)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('category', categoria)

        try {
            const response = await axios.post('http://localhost:4002/api/products', formData)
            console.log('Producto creado:', response.data)
            displaySuccessMessage('Producto creado exitosamente')
            setNombre('')
            setDescripcion('')
            setImagen(null)
            setPrice('')
            setStock('')
            setCategoria('')
            setErrorNombre('')
            setErrorDescripcion('')
            setErrorImagen('')
            setErrorPrice('')
            setErrorStock('')
            setErrorCategoria('')
            setErrorForm('')
            const fileInput = document.getElementById('imagen')
            if (fileInput) {
                fileInput.value = ''
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error('Error:', error.response.data.message)
            } else {
                console.error('An unexpected error occurred:', error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex-nowrap items-center justify-center mx-96'>
            <h1 className='text-center font-bold text-lg mt-12'>Crear Producto</h1>
            {successMessage && (
                <div className='success-message'>
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className='flex items-center justify-between  mt-24'>
                    <div>
                        {/* <label htmlFor='imagen'>Imagen:</label> */}
                        <input
                            type='file'
                            id='imagen'
                            accept='image/*'
                            onChange={handleImagenChange}
                            className='border border-black w-96 h-96 px-4 py-2 rounded-md my-2'
                        />
                        {errorImagen && <span className='error'>{errorImagen}</span>}
                    </div>
                    <div>
                        <div>
                            {/* <label htmlFor='nombre'>Nombre:</label> */}
                            <input
                                type='text'
                                id='nombre'
                                placeholder='Nombre del Producto'
                                value={nombre}
                                onChange={handleNombreChange}
                                className='border border-black w-96 px-4 py-2 rounded-md my-2'
                            />
                            {errorNombre && <span className='error'>{errorNombre}</span>}
                        </div>
                        <div>
                            {/* <label htmlFor='price'>Precio:</label> */}
                            <input
                                type='text'
                                id='price'
                                placeholder='Precio'
                                value={price}
                                onChange={handlePriceChange}
                                className='border border-black w-96 px-4 py-2 rounded-md my-2'
                            />
                            {errorPrice && <span className='error'>{errorPrice}</span>}
                        </div>
                        <div>
                            {/* <label htmlFor='descripcion'>Descripción:</label> */}
                            <textarea
                                id='descripcion'
                                placeholder='Descripción'
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                className='border border-black w-96 px-4 py-2 rounded-md my-2'
                            />
                            {errorDescripcion && <span className='error'>{errorDescripcion}</span>}
                        </div>
                        <div>
                            {/* <label htmlFor='stock'>Stock:</label> */}
                            <input
                                type='text'
                                id='stock'
                                placeholder='Stock Disponible'
                                value={stock}
                                onChange={handleStockChange}
                                className='border border-black w-96 px-4 py-2 rounded-md my-2'
                            />
                            {errorStock && <span className='error'>{errorStock}</span>}
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <label htmlFor='categoria'>Categoría</label>
                            </div>
                            <div>
                                <select
                                    id='categoria'
                                    value={categoria}
                                    onChange={handleCategoriaChange}
                                    className='bg-color-secondary text-color-primary p-2 rounded-md my-2'
                                >
                                    <option value='' disabled>
                                        Seleccione una categoría
                                    </option>
                                    {categorias.map((cat) => (
                                        // <option key={cat._id} value={cat._id}>{cat.name}</option>//almacena la categoria con el ID de la categoria
                                        <option key={cat.name} value={cat.name}>{cat.name}</option>//almacena la categoria con el nombre de la categoria
                                    ))}
                                </select>
                            </div>  
                            {errorCategoria && <span className='error'>{errorCategoria}</span>}
                        </div>
                        <div className='error'>{errorForm}</div>
                        <button type='submit' disabled={isLoading}
                            className='bg-color-button-create w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mt-4'
                        >
                            {isLoading ? 'Creando...' : 'Crear Producto'}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default CreateProductPage








