import multer from 'multer'
import cloudinary from '../config2.js'
import Product from '../models/product.model.js'

// const upload = multer({ dest: 'uploads/' })
const upload = multer({ dest: 'uploads/' }).single('image')

// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     handleErrors(res, error, 'Error al obtener los productos');
//   }
// }
export const getProducts = async (req, res) => {
  try {
    const { page, category, search } = req.params;
    const perPage = 9; // Número de productos por página (ajusta según tus necesidades)

    // Configura las opciones de búsqueda según la categoría (si está presente)
    const options = category ? { category } : {};

    // Agrega la opción de búsqueda por nombre si se proporciona un término de búsqueda
    if (search) {
      options.name = { $regex: new RegExp(search, 'i') }; // Búsqueda insensible a mayúsculas y minúsculas
    }

    // Calcula el índice de inicio para la paginación
    const startIndex = (page - 1) * perPage;

    // Realiza la consulta a la base de datos para obtener los productos paginados
    const products = await Product.find(options)
      .skip(startIndex)
      .limit(perPage);

    res.json(products);
  } catch (error) {
    // Maneja los errores
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = (req, res) => {
  // Utiliza el middleware 'upload' para manejar la carga del archivo 'image'
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: 'Error al cargar la imagen' });
      }

      // Asegúrate de que req.file está definido
      if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
      }

      // Sube la imagen a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Prueba'
      });

      // Crea un nuevo producto
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: result.secure_url, // Almacena la URL de la imagen
        category: req.body.category,
        stock: req.body.stock,
      });

      // Guarda el producto en la base de datos
      await product.save();

      // Responde con el producto creado
      res.json(product);
    } catch (error) {
      // Maneja los errores
      res.status(500).json({ message: error.message });
    }
  });
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    handleErrors(res, error, 'Error al obtener el producto');
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    handleErrors(res, error, 'Error al eliminar el producto');
  }
}

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(updatedProduct);
  } catch (error) {
    handleErrors(res, error, 'Error al actualizar el producto');
  }
}



// // Falta validar que no se manden archivos que no sean imágenes
// // Validar en el backend la longitud de Nombre y Descripción

// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find()
//     res.json(products)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// router.put('/:id', async (req, res) => {
//   // Implementa la lógica para actualizar un producto
// })

// router.delete('/:id', async (req, res) => {
//   // Implementa la lógica para eliminar un producto
// })

// export default router