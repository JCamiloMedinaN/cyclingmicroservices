import mongoose from 'mongoose';
import Category from '../models/category.model.js'
import Product from '../models/product.model.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener las categorías' })
  }
}

export const createCategory = async (req, res) => {

  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: 'El campo name es obligatorio' })
  }

  try {
    const existingCategory = await Category.findOne({ name })

    if (existingCategory) {
      return res.status(400).json({ error: 'La categoría ya existe' })
    }

    const newCategory = new Category({
      name
    })

    const savedCategory = await newCategory.save()
    res.json(savedCategory)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al guardar la categoría' })
  }

}

export const getCategory = async (req, res) => {
  const { id } = req.params

  try {
    const category = await Category.findById(id)
    res.json(category)

  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener la categoría' })
  }

}

export const updateCategory = async (req, res) => {
  const { newName } = req.body
  const categoryId = req.params.id

  if (!newName) {
    return res.status(400).json({ error: 'El campo newName es obligatorio' })
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: newName },
      { new: true }
    )

    if (!updatedCategory) {
      return res.status(404).json({ error: 'No se encontró la categoría' })
    }

    res.json(updatedCategory)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al actualizar la categoría' })
  }
}

export const deleteCategory = async (req, res) => {
  const categoryName = req.params.id; // Cambiado a categoryName

  try {
    // Utiliza la lógica del controlador getProductCountByCategory
    const count = await Product.countDocuments({ category: categoryName });

    if (count > 0) {
      return res.status(400).json({ error: 'Products associated' });
    }

    // Si no hay productos asociados, eliminar la categoría
    const deletedCategory = await Category.findOneAndDelete({ name: categoryName }); // Cambiado a findOneAndDelete

    if (!deletedCategory) {
      return res.status(404).json({ error: 'No se encontró la categoría' });
    }

    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar la categoría' });
  }
};
