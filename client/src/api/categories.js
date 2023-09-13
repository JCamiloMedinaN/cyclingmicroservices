import axios from './axios'

export const getCategoriesRequest = () => axios.get('/categories')

export const getCategoryRequest = (id) => axios.get(`/categories/${id}`)

export const createCategoryRequest = (category) => axios.post('/categories', category)

export const updateCategoryRequest = (category) => axios.put(`/categories/${category._id}`, category)

export const deleteCategoryRequest = (id) => axios.delete(`/categories/${id}`)

