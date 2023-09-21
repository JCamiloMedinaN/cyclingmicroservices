import axios from 'axios'
import { useEffect, useState } from 'react'

function CreateCategoryPage() {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');


  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4002/api/categories', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Unable to fetch categories');
    }
  };

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        'http://localhost:4002/api/categories',
        { name: newCategory },
        { withCredentials: true }
      );
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setNewCategory('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        console.error('Error creating category:', error);
      }
    }
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleEdit = async (categoryId, newName) => {
    try {
      const response = await axios.put(
        `http://localhost:4002/api/categories/${categoryId}`,
        { newName },
        { withCredentials: true }
      );

      const updatedCategory = response.data;

      // Actualiza la lista de categorías en el estado
      const updatedCategories = categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      );

      setCategories(updatedCategories);
      setEditingCategory(null); // Limpia la categoría en edición
      setNewCategoryName(''); // Limpia el nuevo nombre
      setError('');
    } catch (error) {
      console.error('Error editing category:', error);
      setError('Ocurrió un error al editar la categoría.');
    }
  }

  const handleDelete = async (categoryId) => {
    // Aquí debes verificar si hay productos en la categoría
    // Puedes hacer una solicitud al servidor para verificar esto

    try {
      const response = await axios.get(
        `http://localhost:4002/api/categories/${categoryId}`,
        { withCredentials: true }
      );

      // Si hay productos en la categoría, no permitir la eliminación
      if (response.data.length > 0) {
        setError('No se puede eliminar la categoría si hay productos en ella.');
        return;
      }

      // Si no hay productos, permitir la eliminación
      await axios.delete(`http://localhost:4002/api/categories/${categoryId}`, {
        withCredentials: true
      });

      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setError('');
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Ocurrió un error al eliminar la categoría.');
    }
  }

  return (
    <div>
      <div className='flex mt-24 items-center justify-center'>
        <div className='flex flex-col items-center w-96 sm:w-full'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Nueva Categoria'
              value={newCategory}
              onChange={handleCategoryChange}
              className='border border-black w-64 sm:w-96 px-4 py-2 rounded-md my-2'
              autoFocus
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className='flex items-center justify-center mt-4'>
              <button
                type='submit'
                className='bg-color-button-create w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded'
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='items-center justify-center mt-20'>
        <h1 className='text-center font-bold text-lg'>Categorias Creadas</h1>
        <div className='flex mt-7 items-center justify-center lign-middle'>
          <ul>
            {categories.map((category) => (
              <li key={category._id} className='flex justify-between border border-black rounded-md my-4 align-middle max-w-5xl h-16'>

                {editingCategory === category._id ? (
                  <div className='flex items-center w-full px-2'>
                    <input
                      type='text'
                      placeholder='Nuevo nombre'
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className='border rounded-md p-2'
                    />
                    <div className='flex items-center ml-16'>
                      <button
                        onClick={() => handleEdit(category._id, newCategoryName)}
                        className='bg-color-button-create text-color-primary rounded-md p-2 w-32 md:w-40 font-bold mx-2'
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className='bg-color-third text-color-primary rounded-md p-2 w-32 md:w-40 font-bold mx-2'
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-between w-full items-center px-2'>
                    <div className='mr-32'>{category.name}</div>
                    <div className='flex items-center'>
                      <button
                        onClick={() => setEditingCategory(category._id)}
                        className='bg-color-third text-color-primary rounded-md p-2 w-32 md:w-40 font-bold mx-2'
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className='bg-color-button-delete text-color-primary rounded-md p-2 w-32 md:w-40 font-bold mx-2'
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
                {/* Muestra el mensaje de error si existe */}
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </li>
            ))}
          </ul>

        </div>

      </div>
    </div>
  );
}

export default CreateCategoryPage