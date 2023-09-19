import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import Axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para el término de búsqueda
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener la lista de productos con paginación, filtro por categoría y búsqueda
    Axios.get(`http://localhost:4002/api/products`, {
      params: { page, category, search: searchTerm }, // Utiliza params para enviar los parámetros de consulta
      withCredentials: true,
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  }, [page, category, searchTerm]); // Incluye searchTerm en las dependencias

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener la lista de categorías disponibles
    Axios.get('http://localhost:4002/api/categories', { withCredentials: true })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mt-10 mb-4'>
        {/* Agrega un input para ingresar el término de búsqueda */}
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-color-input p-2 rounded-md w-96'
        />
        <button onClick={() => setPage(1)} className='bg-color-secondary  text-color-primary p-2 rounded-md w-20 ml-2'>
          Buscar
        </button>
      </div>
      <div>
        <label>Selecciona una categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='bg-color-secondary  text-color-primary p-2 rounded-md ml-2'
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <ProductList products={products} />

      <div className='my-4'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className='mr-4 bg-color-secondary text-color-primary p-2 rounded-md'>
          Página anterior
        </button>
        <button onClick={() => setPage(page + 1)} className='bg-color-secondary text-color-primary p-2 rounded-md'>
          Página siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
