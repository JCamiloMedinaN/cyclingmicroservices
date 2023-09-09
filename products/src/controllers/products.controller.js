import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

export const createProduct = async (req, res) => {
    const { name, description, price, image, category, stock, rating, comments, createdAt, updatedAt } = req.body
    const newProduct = new Product({
        name, description, price, image, category, stock, rating, comments, createdAt, updatedAt
    })
    const saveProduct = await newProduct.save()
    res.json(saveProduct)
}

export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found'})
    res.json(product)
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found'})
    res.json(product)
}

export const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    if (!product) return res.status(404).json({ message: 'Product not found'})
    res.json(product)
}

