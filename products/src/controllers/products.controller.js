import multer from 'multer'
import cloudinary from '../config2.js'
import Product from '../models/product.model.js'
import fs from 'fs'
import path from 'path'

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
        return res.status(400).json({ message: 'Error al cargar la imagen' })
      }
      if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó ningún archivo' })
      }

      // Validar que el archivo sea una imagen (por extensión)
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = path.extname(req.file.originalname).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Por favor, seleccione una imagen válida' });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Prueba'
      })
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: result.secure_url,
        category: req.body.category,
        stock: req.body.stock,
        publicUrl: result.public_id
      })
      await product.save()
      fs.unlinkSync(req.file.path)
      res.json(product)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
}

export const updateProduct = async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId)
  const publicUrl = product.publicUrl
  try {
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({ message: 'Error al cargar la imagen' })
        }
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Prueba'
          })
          product.image = result.secure_url
          product.publicUrl = result.public_id
        }
        if (req.body.name) product.name = req.body.name
        if (req.body.description) product.description = req.body.description
        if (req.body.price) product.price = req.body.price
        if (req.body.category) product.category = req.body.category
        if (req.body.stock) product.stock = req.body.stock
        await product.save()
        if (req.file) {
          await cloudinary.uploader.destroy(publicUrl)
          fs.unlinkSync(req.file.path)
        }
        res.json(product)
      } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' })
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el producto' })
  }
}

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