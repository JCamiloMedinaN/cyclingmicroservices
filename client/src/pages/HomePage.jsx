// import { useEffect, useState } from 'react';
// import ProductList from '../components/ProductList';
// import Axios from 'axios';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [category, setCategory] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     Axios.get(`http://localhost:4002/api/products`, {
//       params: { page, category, search: searchTerm },
//       withCredentials: true,
//     })
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener productos:', error);
//       });
//   }, [page, category, searchTerm]);

//   useEffect(() => {
//     Axios.get('http://localhost:4002/api/categories', { withCredentials: true })
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener categorías:', error);
//       });
//   }, []);

//   return (
//     <div className='flex flex-col items-center justify-center p-4 mx-40'>
//       <div className='w-full max-w-screen-md '>
//         <div className='flex flex-col items-center justify-center md:flex-row lg:flex-row xl:flex-row 2xl:flex-row'>
//           <input
//             type='text'
//             id='searchInput'
//             placeholder='Buscar productos...'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className='border border-color-input p-2 rounded-md sm:w-96 md:w-7/12 lg:w-7/12 xl:w-4/12 2xl:w-4/12'
//           />
//           <button
//             onClick={() => setPage(1)}
//             className=' bg-color-secondary border border-color-secondary text-color-primary p-2 rounded-md 
//             sm:w-24 sm:mt-2
//             md:ml-2 md:w-20
//             lg:ml-2 lg:w-20
//             xl:ml-2 xl:w-20
//             2xl:ml-2 2xl:w-20'
//           >
//             Buscar
//           </button>
//         </div>
//       </div>
//       <div className='mt-4 mb-8'>
//         <label htmlFor='categorySelect' className='block'>
//           Selecciona una categoría
//         </label>
//         <select
//           id='categorySelect'
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className='border border-color-secondary bg-color-secondary text-color-primary p-2 rounded-md w-full'
//         >
//           <option value=''>Todas las categorías</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat.name}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <ProductList products={products} />

//       <div className='my-4'>
//         <button
//           onClick={() => setPage(page - 1)}
//           disabled={page === 1}
//           className='mr-4 bg-color-secondary text-color-primary p-2 rounded-md'
//         >
//           Página anterior
//         </button>
//         <button
//           onClick={() => setPage(page + 1)}
//           className='bg-color-secondary text-color-primary p-2 rounded-md'
//         >
//           Página siguiente
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import { useEffect, useState } from 'react';
// import ProductList from '../components/ProductList';
// import Axios from 'axios';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [category, setCategory] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categories, setCategories] = useState([]);

//   // Función para cargar los productos
//   const loadProducts = async () => {
//     try {
//       const response = await Axios.get(`http://localhost:4002/api/products`, {
//         params: { page, category, search: searchTerm },
//         withCredentials: true,
//       });
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error al obtener productos:', error);
//     }
//   };

//   useEffect(() => {
//     // Cargar productos cuando cambie la página
//     loadProducts();
//   }, [page, category, searchTerm]);

//   useEffect(() => {
//     // Cargar categorías al montar el componente
//     Axios.get('http://localhost:4002/api/categories', { withCredentials: true })
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener categorías:', error);
//       });
//   }, []);

// // Manejar la búsqueda al hacer clic en el botón de búsqueda
// const handleSearch = () => {
//   // Reiniciar la página a 1 al realizar una nueva búsqueda
//   setPage(1);
// };

// // Manejar la paginación
// const handlePageChange = (newPage) => {
//   setPage(newPage);
// };

//   return (
//     <div className='flex flex-col items-center justify-center p-4 md:mx-20 lg:mx-40 xl:mx-40 2xl:mx-40'>
//       <div className='w-full max-w-screen-md '>
//         <div className='flex flex-col items-center justify-center md:flex-row lg:flex-row xl:flex-row 2xl:flex-row'>
//           <input
//             type='text'
//             id='searchInput'
//             placeholder='Buscar productos...'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className='border border-color-input p-2 rounded-md sm:w-80 md:w-7/12 lg:w-7/12 xl:w-4/12 2xl:w-4/12'
//           />
//           <button
//             onClick={() => {
//               handleSearch();
//               loadProducts(); // Cargar productos con los nuevos filtros
//             }}
//             className=' bg-color-secondary border border-color-secondary text-color-primary p-2 rounded-md 
//             sm:w-24 sm:mt-2
//             md:ml-2 md:w-20
//             lg:ml-2 lg:w-20
//             xl:ml-2 xl:w-20
//             2xl:ml-2 2xl:w-20'
//           >
//             Buscar
//           </button>
//         </div>
//       </div>
//       <div className='mt-4 mb-8'>
//         <label htmlFor='categorySelect' className='block'>
//           Selecciona una categoría
//         </label>
//         <select
//           id='categorySelect'
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className='border border-color-secondary bg-color-secondary text-color-primary p-2 rounded-md w-full'
//         >
//           <option value=''>Todas las categorías</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat.name}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <ProductList products={products} />

//       <div className='mt-8 mb-6'>
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//           className='mr-4 bg-color-secondary text-color-primary p-2 rounded-md'
//         >
//           Página anterior
//         </button>
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           className='bg-color-secondary text-color-primary p-2 rounded-md'
//         >
//           Página siguiente
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from 'react';
import Axios from 'axios';
import ProductList from '../components/ProductList';
// import Carousel from '../components/Carousel'; // Importa el componente de carrusel

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  // const [carouselImages, setCarouselImages] = useState([]); // Estado para las URLs de las imágenes del carrusel

  // Función para cargar los productos
  const loadProducts = async () => {
    try {
      const response = await Axios.get(`http://localhost:4002/api/products`, {
        params: { page, category, search: searchTerm },
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    // Cargar productos cuando cambie la página
    loadProducts();
  }, [page, category, searchTerm]);

  useEffect(() => {
    // Cargar categorías al montar el componente
    Axios.get('http://localhost:4002/api/categories', { withCredentials: true })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  // Obtener imágenes del carrusel
  // useEffect(() => {
  //   Axios.get('http://localhost:4002/api/carousel-images', {
  //     withCredentials: true,
  //   })
  //     .then((response) => {
  //       setCarouselImages(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error al obtener imágenes del carrusel:', error);
  //     });
  // }, []);

  // Manejar la búsqueda al hacer clic en el botón de búsqueda
  const handleSearch = () => {
    // Reiniciar la página a 1 al realizar una nueva búsqueda
    setPage(1);
  };

  // Manejar la paginación
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:mx-20 lg:mx-40 xl:mx-40 2xl:mx-40">
      <div className="w-full max-w-screen-md ">
        {/* Renderiza el carrusel con las imágenes */}
        {/* <Carousel images={carouselImages} /> */}
        <div className="flex flex-col items-center justify-center md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
          <input
            type="text"
            id="searchInput"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-color-input p-2 rounded-md sm:w-80 md:w-7/12 lg:w-7/12 xl:w-4/12 2xl:w-4/12"
          />
          <button
            onClick={() => {
              handleSearch();
              loadProducts(); // Cargar productos con los nuevos filtros
            }}
            className=" bg-color-secondary border border-color-secondary text-color-primary p-2 rounded-md 
            sm:w-24 sm:mt-2
            md:ml-2 md:w-20
            lg:ml-2 lg:w-20
            xl:ml-2 xl:w-20
            2xl:ml-2 2xl:w-20"
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="mt-4 mb-8">
        <label htmlFor="categorySelect" className="block">
          Selecciona una categoría
        </label>
        <select
          id="categorySelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-color-secondary bg-color-secondary text-color-primary p-2 rounded-md w-full"
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

      <div className="mt-8 mb-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="mr-4 bg-color-secondary text-color-primary p-2 rounded-md"
        >
          Página anterior
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-color-secondary text-color-primary p-2 rounded-md"
        >
          Página siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
