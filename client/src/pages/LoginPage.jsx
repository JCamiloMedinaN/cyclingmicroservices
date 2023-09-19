import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, isAuthenticated, errors: signinErrors, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const onSubmit = handleSubmit((data) => {
    signin(data)
  })

  if (loading) return <h1>loading...</h1>

  return (
    <div className=' flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='border border-black max-w-md w-full p-10 rounded-md'>
        {
          signinErrors.map((error, i) => (
            <div className='bg-color-error p-0.5 my-2 text-color-primary text-center rounded-md' key={i}>
              {error}
            </div>
          ))
        }

        <h1 className='text-2xl font-bold'>Login</h1>
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

          <button type='submit' className='bg-color-secondary  text-color-primary font-bold px-4 py-2 rounded-md my-4'>
            Iniciar Sesión
          </button>
        </form>

        <p className='flex gap-x-2 justify-between text-gray-400 font-style: italic'>
          Aun no tienes cuenta? <Link to='/register' className='text-color-third'>Registrarme</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage