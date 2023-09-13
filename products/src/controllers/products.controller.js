import Product from '../models/product.model.js'

// export const getProducts = async (req, res) => {
//     const products = await Product.find()
//     res.json(products)
// }


//paginación, búsqueda y filtros
export const getProducts = async (req, res) => {
    try {
        const { page, limit, search, category } = req.query;
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * itemsPerPage;

        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query)
            .skip(skip)
            .limit(itemsPerPage);

        const totalProducts = await Product.countDocuments(query);

        res.json({
            products,
            currentPage,
            totalPages: Math.ceil(totalProducts / itemsPerPage),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
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
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
}

export const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
}

