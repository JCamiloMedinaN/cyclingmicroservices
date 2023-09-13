import { createContext, useContext, useState } from "react"
import { createCategoryRequest, getCategoriesRequest } from "../api/categories"

const CategoryContext = createContext()

export const useCategories = () => {
    const context = useContext(CategoryContext)

    if (!context) {
        throw new Error('useCategories must be used within a CategoryProvider')
    }

    return context
}

export function CategoryProvider({ children }) {
    const [categories, setCategory] = useState([])

    const getCategories = async () => {
        const res = await getCategoriesRequest()
        setCategories(res.data)
    }

    const createCategory = async (category) => {
        try {
            const res = await createCategoryRequest(category)
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <CategoryContext.Provider
            value={{
                categories,
                createCategory,
                getCategories,
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}