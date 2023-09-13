import { useForm } from "react-hook-form"
import { useCategories } from "../context/CategoryContext"
import { useEffect } from "react"

function CreateCategoryPage() {

    const { register, handleSubmit } = useForm()
    const { createCategory, getCategories, categories } = useCategories()

    const onSubmit = handleSubmit((data) => {
        createCategory(data)

        useEffect(() => {
            getCategories()
        }, [])

    })

    return (
        <div>
            <div className='flex mt-24 items-center justify-center'>
                <div className='flex flex-col items-center'>
                    <form action="">
                        <input
                            type='text'
                            placeholder='Nueva Categoria'
                            {...register('Nueva Categoria')}
                            className='border border-black w-96 px-4 py-2 rounded-md my-2'
                            autoFocus
                        />

                        <div className="flex items-center justify-center mt-4">
                            <button className="bg-color-button-create w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded">
                                Crear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex mt-24 items-center justify-center'>
                <h1>Categorias Creadas</h1>
                {/* Obtener categorías */}
                <div>
                    {
                        categories.map((category) => (
                            <div key={category._id}>
                                <h1>{category.name}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>




    )
}

export default CreateCategoryPage
