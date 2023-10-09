import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';
import { verifyTokenRequest } from '../api/auth.js';

function Navbar() {
	const { isAdmin, isAuthenticated, logout, user } = useAuth();
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const checkLogin = async () => {
			if (isAuthenticated) {
				const cookies = Cookies.get();
				try {
					const res = await verifyTokenRequest(cookies.token);
					// ...
				} catch (error) {
					console.log(error);
					logout();
				}
			}
		};

		checkLogin();

		const interval = setInterval(() => {
			checkLogin();
		}, 1000);

		return () => clearInterval(interval);
	}, [isAuthenticated, isAdmin, logout]);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="bg-color-secondary">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center md:hidden lg:hidden xl:hidden 2xl:hidden">
						<button
							type="button"
							className={`relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden lg:hidden xl:hidden 2xl:hidden`}
							aria-controls="mobile-menu"
							aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
							onClick={toggleMobileMenu}
						>
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<svg
								className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
							<svg
								className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-center">
						<div className="flex flex-shrink-0 items-center">
							<Link to="/">
								<h1 className="text-2xl font-bold text-color-primary sm:text-center md:ml-28 lg:ml-28 xl:ml-28">CYCLING</h1>
							</Link>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<div className="hidden sm:ml-6 md:block lg:block xl:block 2xl:block">
							<div className="flex w-max space-x-4 absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<ul className="flex gap-x-2">
									{isAuthenticated ? (
										<>
											{isAdmin && (
												<>
													<li>
														<Link to="/createproduct" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Crear Producto</Link>
													</li>
													<li>
														<Link to="/createcategory" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Crear Categoría</Link>
													</li>
													<li>
														<Link to="/editproduct" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Editar Producto</Link>
													</li>
												</>
											)}
											<li>
												<Link to="/" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Tienda</Link>
											</li>
											<li>
												<Link to="/shoppingcart" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Carrito</Link>
											</li>
											<li className="text-color-primary hover:text-white block rounded-md px-3 py-2 text-base font-medium">{user.username}</li>
											<li>
												<Link
													to="/"
													onClick={() => {
														logout();
													}}
													className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium"
												>
													Cerrar Sesión
												</Link>
											</li>
										</>
									) : (
										<>
											<li>
												<Link to="/" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Tienda</Link>
											</li>
											<li>
												<Link to="/login" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Login</Link>
											</li>
											<li>
												<Link to="/register" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Regístrate</Link>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`md:hidden lg:hidden xl:hidden 2xl:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
				<div className="space-y-1 px-2 pb-3 pt-2">
					<ul className="gap-x-5">
						{isAuthenticated ? (
							<>
								{isAdmin && (
									<>
										<li>
											<Link to="/createproduct" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Crear Producto</Link>
										</li>
										<li>
											<Link to="/createcategory" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Crear Categoría</Link>
										</li>
										<li>
											<Link to="/editproduct" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Editar Producto</Link>
										</li>
									</>
								)}
								<li>
									<Link to="/" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Tienda</Link>
								</li>
								<li>
									<Link to="/shoppingcart" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Carrito</Link>
								</li>
								<li className="text-color-primary  hover:text-white block rounded-md px-3 py-2 text-base font-medium">{user.username}</li>
								<li>
									<Link
										to="/"
										onClick={() => {
											logout();
										}}
										className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium"
									>
										Cerrar Sesión
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="/" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Tienda</Link>
								</li>
								<li>
									<Link to="/login" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Login</Link>
								</li>
								<li>
									<Link to="/register" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Regístrate</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;




// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Cookies from 'js-cookie';
// import { verifyTokenRequest } from '../api/auth.js';

// function Navbar() {
// 	const { isAdmin, isAuthenticated, logout, user } = useAuth();
// 	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

// 	useEffect(() => {
// 		const checkLogin = async () => {
// 			if (isAuthenticated) {
// 				const cookies = Cookies.get();
// 				try {
// 					const res = await verifyTokenRequest(cookies.token);
// 					// ...
// 				} catch (error) {
// 					console.log(error);
// 					logout();
// 				}
// 			}
// 		};

// 		checkLogin();

// 		const interval = setInterval(() => {
// 			checkLogin();
// 		}, 1000);

// 		return () => clearInterval(interval);
// 	}, [isAuthenticated, isAdmin, logout]);

// 	const toggleMobileMenu = () => {
// 		setMobileMenuOpen(!isMobileMenuOpen);
// 	};

// 	return (
// 		<nav className="bg-color-secondary">
// 			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
// 				<div className="relative flex h-16 items-center justify-between">
// 					{/* Botón de hamburguesa solo en pantallas pequeñas (menos de 768px) */}
// 					<div className="sm:hidden">
// 						<button
// 							type="button"
// 							className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
// 							aria-controls="mobile-menu"
// 							aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
// 							onClick={toggleMobileMenu}
// 						>
// 							<span className="absolute -inset-0.5" />
// 							<span className="sr-only">Open main menu</span>
// 							<svg
// 								className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
// 								fill="none"
// 								viewBox="0 0 24 24"
// 								strokeWidth="1.5"
// 								stroke="currentColor"
// 								aria-hidden="true"
// 							>
// 								<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
// 							</svg>
// 							<svg
// 								className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
// 								fill="none"
// 								viewBox="0 0 24 24"
// 								strokeWidth="1.5"
// 								stroke="currentColor"
// 								aria-hidden="true"
// 							>
// 								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
// 							</svg>
// 						</button>
// 					</div>
// 					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
// 						<div className="flex flex-shrink-0 items-center">
// 							<Link to="/">
// 								<h1 className="text-2xl font-bold text-color-primary">CYCLING</h1>
// 							</Link>
// 						</div>
// 					</div>
// 					{/* Resto del Navbar en pantallas medianas a grandes */}
// 					<div className="hidden sm:ml-6 sm:block">
// 						<div className="flex space-x-4 absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
// 							<ul className="flex gap-x-5">
// 								{isAuthenticated ? (
// 									<>
// 										{isAdmin && (
// 											<>
// 												<li>
// 													<Link to="/createproduct" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Crear Producto</Link>
// 												</li>
// 												<li>
// 													<Link to="/createcategory" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Crear Categoría</Link>
// 												</li>
// 												<li>
// 													<Link to="/editproduct" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Editar Producto</Link>
// 												</li>
// 											</>
// 										)}
// 										<li>
// 											<Link to="/" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Tienda</Link>
// 										</li>
// 										<li>
// 											<Link to="/shoppingcart" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Carrito</Link>
// 										</li>
// 										<li className="text-color-primary hover:text-white block rounded-md px-3 py-2 text-base font-medium">{user.username}</li>
// 										<li>
// 											<Link
// 												to="/"
// 												onClick={() => {
// 													logout();
// 												}}
// 												className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium"
// 											>
// 												Cerrar Sesión
// 											</Link>
// 										</li>
// 									</>
// 								) : (
// 									<>
// 										<li>
// 											<Link to="/" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Tienda</Link>
// 										</li>
// 										<li>
// 											<Link to="/login" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Login</Link>
// 										</li>
// 										<li>
// 											<Link to="/register" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Regístrate</Link>
// 										</li>
// 									</>
// 								)}
// 							</ul>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			{/* Menú móvil */}
// 			<div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
// 				<div className="space-y-1 px-2 pb-3 pt-2">
// 					<ul className="gap-x-5">
// 						{isAuthenticated ? (
// 							<>
// 								{isAdmin && (
// 									<>
// 										<li>
// 											<Link to="/createproduct" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Crear Producto</Link>
// 										</li>
// 										<li>
// 											<Link to="/createcategory" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Crear Categoría</Link>
// 										</li>
// 										<li>
// 											<Link to="/editproduct" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Editar Producto</Link>
// 										</li>
// 									</>
// 								)}
// 								<li>
// 									<Link to="/" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Tienda</Link>
// 								</li>
// 								<li>
// 									<Link to="/shoppingcart" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Carrito</Link>
// 								</li>
// 								<li className="text-color-primary hover:text-white block rounded-md px-3 py-2 text-base font-medium">{user.username}</li>
// 								<li>
// 									<Link
// 										to="/"
// 										onClick={() => {
// 											logout();
// 										}}
// 										className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium"
// 									>
// 										Cerrar Sesión
// 									</Link>
// 								</li>
// 							</>
// 						) : (
// 							<>
// 								<li>
// 									<Link to="/" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Tienda</Link>
// 								</li>
// 								<li>
// 									<Link to="/login" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Login</Link>
// 								</li>
// 								<li>
// 									<Link to="/register" className="text-color-primary hover:bg-color-navbarhover hover:text-white block rounded-md px-3 py-2 text-base font-medium">Regístrate</Link>
// 								</li>
// 							</>
// 						)}
// 					</ul>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }

// export default Navbar;

