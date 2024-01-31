import { useState, useEffect } from 'react'
import axios from 'axios'

function CreateProductPage({ onSubmit }) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
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
    setErrorNombre(event.target.value.length < 5 ? 'El nombre debe tener al menos 5 letras' : '')
  }

  const handleDescripcionChange = (event) => {
    const description = event.target.value;
    setDescripcion(description);
    // Verificar si la descripción tiene al menos 4 caracteres
    if (description.length < 4) {
      setErrorDescripcion('La descripción debe tener al menos 4 caracteres.');
    } else {
      // Contar las palabras en la descripción
      const wordCount = description.split(' ').length;
  
      // Establecer el límite de palabras
      const wordLimit = 160;
  
      // Calcular la cantidad de palabras restantes
      const wordsRemaining = wordLimit - wordCount;
  
      // Actualizar el estado de error si se excede el límite
      if (wordsRemaining < 0) {
        setErrorDescripcion(`Se excedió el límite de palabras. ${Math.abs(wordsRemaining)} palabras demasiadas.`);
      } else {
        setErrorDescripcion('');
      }
    }
  };
  
  const handleImagenChange = (event) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      setImagen(null);
      setImageUrl('');
      setErrorImagen('Por favor, seleccione una imagen');
      return;
    }

    // Obtener la extensión del archivo
    const fileExtension = selectedImage.name.split('.').pop().toLowerCase();

    // Validar que el archivo sea una imagen (por extensión)
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    if (!allowedExtensions.includes('.' + fileExtension)) {
      setImagen(null);
      setImageUrl('');
      setErrorImagen('Por favor, seleccione una imagen válida (jpg, jpeg, png o webp)');
      return;
    }

    setImagen(selectedImage);

    const imageURL = URL.createObjectURL(selectedImage);
    setImageUrl(imageURL);
    setErrorImagen('');
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;

    // Expresión regular para validar números con al menos 4 dígitos
    const priceRegex = /^[1-9][0-9]{3,}$/;

    // Verificar si el nuevo precio coincide con la expresión regular
    if (!priceRegex.test(newPrice)) {
      setErrorPrice('El precio debe ser mayor que 0 y de al menos 4 dígitos');
    } else {
      setErrorPrice('');
    }

    setPrice(newPrice);
  };

  const handleStockChange = (event) => {
    const newStock = event.target.value;

    // Expresión regular para validar números enteros mayores que 0
    const stockRegex = /^[1-9][0-9]*$/;

    // Verificar si el nuevo stock coincide con la expresión regular
    if (!stockRegex.test(newStock)) {
      setErrorStock('El stock debe ser un número entero mayor que 0');
    } else {
      setErrorStock('');
    }

    setStock(newStock);
  };

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
        <div className='success-message  text-center bg-color-button-create text-color-primary p-1 mt-2 rounded-md'>
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='flex items-center justify-between  mt-24'>
          <div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt='Imagen seleccionada'
                className='rounded-md w-96 border'
              />
            )}
          </div>
          <div>
            <div className='flex-col'>
              {/* <label htmlFor='nombre'>Nombre:</label> */}
              <div>
                <input
                  type='text'
                  id='nombre'
                  placeholder='Nombre del Producto'
                  value={nombre}
                  onChange={handleNombreChange}
                  className='border border-black w-96 px-4 py-2 rounded-md my-2'
                />
              </div>
              <div>
                {errorNombre && <span className='error bg-color-button-delete text-color-primary p-1 rounded-md'>{errorNombre}</span>}
              </div>
            </div>
            <div className='flex-col'>
              {/* <label htmlFor='price'>Precio:</label> */}
              <div>
                <input
                  type='text'
                  id='price'
                  placeholder='Precio'
                  value={price}
                  onChange={handlePriceChange}
                  className='border border-black w-96 px-4 py-2 rounded-md my-2'
                />
              </div>
              <div>
                {errorPrice && <span className='error bg-color-button-delete text-color-primary p-1 rounded-md'>{errorPrice}</span>}
              </div>
            </div>
            <div className='flex-col'>
              {/* <label htmlFor='descripcion'>Descripción:</label> */}
              <div>
                <textarea
                  id='descripcion'
                  placeholder='Descripción'
                  value={descripcion}
                  onChange={handleDescripcionChange}
                  className='border border-black w-96 px-4 py-2 rounded-md my-2'
                />
              </div>
              <div>
                {errorDescripcion && <span className='error bg-color-button-delete text-color-primary p-1 rounded-md'>{errorDescripcion}</span>}
              </div>
            </div>
            <div className='flex-col'>
              {/* <label htmlFor='stock'>Stock:</label> */}
              <div>
                <input
                  type='text'
                  id='stock'
                  placeholder='Stock Disponible'
                  value={stock}
                  onChange={handleStockChange}
                  className='border border-black w-96 px-4 py-2 rounded-md my-2'
                />
              </div>
              <div>
                {errorStock && <span className='error bg-color-button-delete text-color-primary p-1 rounded-md'>{errorStock}</span>}
              </div>
            </div>
            <div className='flex-col'>
              <div>
                {/* <label htmlFor='imagen'>Imagen:</label> */}
                <input
                  type='file'
                  id='imagen'
                  accept='image/*'
                  onChange={handleImagenChange}
                  className='border border-black w-96 px-4 py-2 rounded-md my-2'
                />
              </div>
              <div>
                {errorImagen && <span className='error bg-color-button-delete text-color-primary p-1 rounded-md'>{errorImagen}</span>}
              </div>
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
            <div className='error text-color-error p-1 rounded-md'>{errorForm}</div>
            <button type='submit' disabled={isLoading}
              className='bg-color-button-create w-40 text-color-primary font-bold py-2 px-4 rounded mt-4'
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
