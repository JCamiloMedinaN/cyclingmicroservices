import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signinadmin, isAuthenticated, isAdmin, errors: signinErrors, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && !isAdmin) navigate('/profile')
  }, [isAuthenticated, isAdmin])

  useEffect(() => {
    if (isAuthenticated && isAdmin) navigate('/createproduct')
  }, [isAuthenticated, isAdmin])

  const onSubmit = handleSubmit((data) => {
    signinadmin(data)
  })

  if (loading) return <h1>loading...</h1>

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='border border-black max-w-md w-full p-10 rounded-md'>
        {
          signinErrors.map((error, i) => (
            <div className='bg-color-error p-0.5 my-2 text-color-primary text-center rounded-md' key={i}>
              {error}
            </div>
          ))
        }

        <h1 className='text-2xl font-bold'>Admin Login</h1>
        <form onSubmit={onSubmit}>

          <input type='email' {...register('email', { required: true })}
            className='border border-black w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='email'
          />
          {errors.email && <p className='text-red-500'>Email requerido</p>}


          <input type='password' {...register('password', { required: true })}
            className='border border-black w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='contraseña'
          />
          {errors.password && <p className='text-red-500'>Contraseña requerido</p>}

          <button type='submit' className='bg-color-secondary font-bold text-color-primary px-4 py-2 rounded-md my-4'>
            Iniciar Sesión
          </button>
        </form>

      </div>
    </div>
  )
}

export default AdminLoginPage