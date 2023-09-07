import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signinadmin, isAuthenticated, isAdmin,  errors: signinErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated && isAdmin) navigate("/createproduct");
    }, [isAuthenticated, isAdmin])

    const onSubmit = handleSubmit((data) => {
        signinadmin(data)
    })
    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-0.5 my-2 text-white text-center rounded-md' key={i}>
                            {error}
                        </div>
                    ))
                }

                <h1 className='text-2xl font-bold'>Admin Login</h1>
                <form onSubmit={onSubmit}>

                    <input type="email" {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='email'
                    />
                    {errors.email && <p className='text-red-500'>Email requerido</p>}


                    <input type="password" {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='contraseña'
                    />
                    {errors.password && <p className='text-red-500'>Contraseña requerido</p>}

                    <button type='submit' className='bg-zinc-700 px-4 py-2 rounded-md my-4'>
                        Iniciar Sesión
                    </button>
                </form>

            </div>
        </div>
    )
}

export default AdminLoginPage

