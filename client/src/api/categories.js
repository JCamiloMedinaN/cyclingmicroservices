import { products } from './instance'

export const getCategoriesRequest = () => products.get('/categories')
export const getCategoryRequest = (id) => products.get(`/categories/${id}`)
export const createCategoryRequest = (category) => products.post('/categories', category)
export const updateCategoryRequest = (category) => products.put(`/categories/${category._id}`, category)
export const deleteCategoryRequest = (id) => products.delete(`/categories/${id}`)