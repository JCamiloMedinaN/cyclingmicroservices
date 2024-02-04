import multer from 'multer'
import cloudinary from '../config2.js'
import Product from '../models/product.model.js'
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai';

const upload = multer({ dest: 'uploads/' }).single('image')

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' })
  }
}

export const getProducts = async (req, res) => {
  try {
    const { page, category, search } = req.query
    const perPage = 9
    const options = category ? { category } : {}
    if (search) {
      options.name = { $regex: new RegExp(search, 'i') }
    }
    const startIndex = (page - 1) * perPage
    const products = await Product.find(options)
      .skip(startIndex)
      .limit(perPage)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: 'Error al cargar la imagen' });
      }
      if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
      }
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Por favor, seleccione una imagen válida' });
      }
      const { name, description, price, category, stock } = req.body;
      if (name.length < 5) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'El nombre del producto debe tener al menos 5 letras' });
      }
      const parsedStock = parseInt(stock, 10);
      if (isNaN(parsedStock) || parsedStock === 0) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'El stock debe ser un número mayor a 0' });
      }
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0 || price.length < 4) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'El precio debe ser un número mayor a 0 y tener al menos 4 dígitos' });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Prueba',
      });
      const product = new Product({
        name,
        description,
        price: parsedPrice,
        image: result.secure_url,
        category,
        stock: parsedStock,
        publicUrl: result.public_id,
      });
      await product.save();
      fs.unlinkSync(req.file.path);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  const publicUrl = product.publicUrl;
  try {
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({ message: 'Error al cargar la imagen' });
        }
        if (req.file) {
          const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
          const fileExtension = path.extname(req.file.originalname).toLowerCase();
          if (!allowedExtensions.includes(fileExtension)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Por favor, seleccione una imagen válida' });
          }
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Prueba'
          });
          product.image = result.secure_url;
          product.publicUrl = result.public_id;
        }
        if (req.body.name && req.body.name.length < 5) {
          return res.status(400).json({ message: 'El nombre del producto debe tener al menos 5 letras' });
        }
        if (req.body.name) product.name = req.body.name;
        if (req.body.description) product.description = req.body.description;
        const updatedPrice = parseFloat(req.body.price);
        if (isNaN(updatedPrice) || updatedPrice <= 0 || req.body.price.length < 4) {
          return res.status(400).json({ message: 'El precio debe ser un número mayor a 0 y tener al menos 4 dígitos' });
        }
        product.price = updatedPrice;
        const updatedStock = parseInt(req.body.stock);
        if (isNaN(updatedStock) || updatedStock <= 0) {
          return res.status(400).json({ message: 'El stock debe ser un número mayor a 0' });
        }
        product.stock = updatedStock;
        if (req.body.category) product.category = req.body.category;
        if (req.body.stock) product.stock = req.body.stock;
        await product.save();
        if (req.file) {
          await cloudinary.uploader.destroy(publicUrl);
          fs.unlinkSync(req.file.path);
        }
        res.json(product);
      } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)
    const publicUrl = product.publicUrl
    const product2 = await Product.findByIdAndDelete(productId)
    await cloudinary.uploader.destroy(publicUrl)
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json(product2)
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' })
  }
}

export const realizarCompra = async (req, res) => {
  const { products } = req.body;
  try {
    for (const { productId, quantity } of products) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Producto con ID ${productId} no encontrado`});
      }
      if (product.stock < quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }
      product.stock -= quantity;
      await product.save();
    }
    res.json({ message: 'Compra realizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la compra', error: error.message });
  }
};


const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});


export const createComment = async (req, res) => {
  try {
    const productId = req.params.id;
    const { comment, author } = req.body;
    const contextInfo = {
      productId,
      comment,
      author,
      possibleScores: ['Excelente', 'Sobresaliente', 'Aceptable', 'Insuficiente', 'Deficiente'],
    };
    const response = await getScoreFromChatGPT(contextInfo, comment);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const score = response.data.score;
    product.comments.push({ text: comment, author, score });
    await product.save();
    res.json({ message: 'Comentario agregado exitosamente', score });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el comentario', error: error.message });
  }
};

const getScoreFromChatGPT = async (contextInfo, comment) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `Devuelve Excelente, Sobresaliente, Aceptable, Insuficiente o Deficiente según tu interpretación de este comentario: ${comment}`}],
      model: 'gpt-3.5-turbo',
    });

    const rawScore = chatCompletion.choices[0].message.content;
    const formattedScore = extractFormattedScore(rawScore);

    console.log(formattedScore);
    return { data: { score: formattedScore } };
  } catch (error) {
    console.error('Error en la solicitud a ChatGPT:', error);
    throw error;
  }
};

const extractFormattedScore = (rawScore) => {
  // Ejemplo muy básico basado en palabras clave en la respuesta
  if (rawScore.includes('Excelente')) {
    return 'Excelente';
  } else if (rawScore.includes('Sobresaliente')) {
    return 'Sobresaliente';
  } else if (rawScore.includes('Aceptable')) {
    return 'Aceptable';
  } else if (rawScore.includes('Insuficiente')) {
    return 'Insuficiente';
  } else if (rawScore.includes('Deficiente')) {
    return 'Deficiente';
  } else {
    // Manejar otros casos según sea necesario.
    return 'No clasificado';
  }
};

// const getScoreFromChatGPT = async (contextInfo, comment) => {
//   try {
//   const chatCompletion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: Devuelve Excelente, Sobresaliente, Aceptable, Insuficiente o Deficiente según tu interpretación de este comentario: ${comment}}],
//     model: 'gpt-3.5-turbo',
//   });
//     const score = chatCompletion.choices[0].message.content
//     console.log(chatCompletion.choices[0].message.content)
//     return { data: { score } };
//   } catch (error) {
//     console.error('Error en la solicitud a ChatGPT:', error);
//     throw error;
//   }
// };

export const getAllComments = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const commentsWithAuthorAndScore = product.comments.map((comment) => ({
      text: comment.text,
      author: comment.author,
      score: comment.score
    }));
    res.json(commentsWithAuthorAndScore);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
  }
};