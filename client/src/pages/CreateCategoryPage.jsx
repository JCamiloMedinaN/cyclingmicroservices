import axios from 'axios';
import { useEffect, useState } from 'react';

function CreateCategoryPage() {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div>
      <div className='flex mt-24 items-center justify-center'>
        <div className='flex flex-col items-center'>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Nueva Categoria'
              value={newCategory}
              onChange={handleCategoryChange}
              className='border border-black w-96 px-4 py-2 rounded-md my-2'
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
      <div>
        <center>
          <br />
          <br />
          <h2>Categorias Creadas: </h2>
          <div>
            <ul>
              {categories.map((category) => (
                <li key={category._id}>{'* ' + category.name}</li>
              ))}
            </ul>
          </div>
        </center>
      </div>
    </div>
  );
}

export default CreateCategoryPage;