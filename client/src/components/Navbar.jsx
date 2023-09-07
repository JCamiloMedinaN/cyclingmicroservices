import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, isAdmin, logout, user } = useAuth();

    return (
        <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
            <Link to='/'>
                <h1 className='text-2xl font-bold'>CYCLING</h1>
            </Link>
            <ul className='flex gap-x-5'>
                {isAuthenticated ? (
                    <>
                        {isAdmin && (
                            <>
                                <li>
                                    <Link to='/createproduct'>Crear Producto</Link>
                                </li>
                                <li>
                                    <Link to='/createcategory'>Crear Categoría</Link>
                                </li>
                                <li>
                                    <Link to='/editproduct'>Editar Producto</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to='/'>Tienda</Link>
                        </li>
                        <li>
                            <Link to='/shoppingcart'>Carrito</Link>
                        </li>
                        <li>{user.username}</li>
                        <li>
                            <Link
                                to='/'
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Cerrar Sesión
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Regístrate</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;





