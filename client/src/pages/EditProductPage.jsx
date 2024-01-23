import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const EditProductPage = () => {
	const { productId } = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState({
		name: '',
		description: '',
		price: 0,
		stock: 0,
		image: null,
		category: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		price: '',
		stock: '',
		category: '',
		image: '',
	});

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		Axios.get('http://localhost:4002/api/categories', {
			withCredentials: true,
		})
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.error('Error al obtener las categorías:', error);
			});
	}, []);

	useEffect(() => {
		Axios.get(`http://localhost:4002/api/products/${productId}`, {
			withCredentials: true,
		})
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => {
				console.error('Error al obtener detalles del producto:', error);
			});
	}, [productId]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProduct({
			...product,
			[name]: value,
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProduct({
				...product,
				image: file,
			});
		}
	};

	const validateForm = () => {
		let valid = true;
		const newErrors = {
			name: '',
			description: '',
			price: '',
			stock: '',
			category: '',
			image: '',
		};

		// Validación del nombre si se ingresó
		if (product.name.length > 0 && product.name.length < 5) {
			valid = false;
			newErrors.name = 'El nombre debe tener al menos 5 letras';
		}

		// Validación de la descripción si se ingresó
		if (product.description.length > 0 && product.description.length < 4) {
			valid = false;
			newErrors.description = 'La descripción debe tener al menos 4 caracteres';
		}

		// Validación del precio si se ingresó
		if (
			product.price !== '' &&
			(isNaN(parseFloat(product.price)) ||
				parseFloat(product.price) <= 0 ||
				product.price.length < 4)
		) {
			valid = false;
			newErrors.price = 'El precio debe ser un número mayor a 0 y tener al menos 4 dígitos';
		}

		// Validación del stock si se ingresó
		if (
			product.stock !== '' &&
			(isNaN(parseInt(product.stock)) || parseInt(product.stock) <= 0)
		) {
			valid = false;
			newErrors.stock = 'El stock debe ser un número mayor a 0';
		}

		// Validación de la categoría si se seleccionó
		if (product.category === '') {
			valid = false;
			newErrors.category = 'Por favor, seleccione una categoría';
		}

		// Validación de la imagen si se cambió
		if (product.image !== null && typeof product.image !== 'string') {
			const fileExtension = product.image.name
				.split('.')
				.pop()
				.toLowerCase();
			const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

			if (!allowedExtensions.includes('.' + fileExtension)) {
				valid = false;
				newErrors.image = 'Por favor, seleccione una imagen válida (jpg, jpeg o png)';
			}
		}

		setErrors(newErrors);
		return valid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				const formData = new FormData();
				formData.append('name', product.name);
				formData.append('description', product.description);
				formData.append('price', product.price);
				formData.append('stock', product.stock);
				formData.append('image', product.image);
				formData.append('category', product.category);
				await Axios.put(`http://localhost:4002/api/products/${productId}`, formData, {
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				navigate(`/product/${productId}`);
			} catch (error) {
				console.error('Error al editar el producto:', error);
			}
		}
	};

	return (
		<div className="mx-80">
			<h1 className="text-center font-bold text-lg mt-12">Editar Producto</h1>
			<form onSubmit={handleSubmit}>
				<div className="flex items-center justify-between mt-24">
					{/* Resto del formulario */}
					<div>
						{/* image */}
						<div className='flex flex-col mb-4'>
							<label htmlFor='image' className='block font-bold'>
							</label>
							{product.image && typeof product.image !== 'string' && (
								<div>
									<img
										src={URL.createObjectURL(product.image)}
										alt='Imagen del producto'
										className='rounded-md w-96 border'
									/>
								</div>

							)}

						</div>
					</div>
					<div>
						<div className="flex-col">
							<div>
								<label htmlFor="name" className="block font-bold">
									Nombre del Producto:
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={product.name}
									onChange={handleInputChange}
									className="border border-color-input p-2 rounded-md w-96"
								/>
							</div>
							<div className='mt-1'>
								{errors.name && <span className="error bg-color-button-delete text-color-primary p-1 rounded-md">{errors.name}</span>}
							</div>
						</div>
						<div className="flex-col">
							<div>
								<label htmlFor="description" className="block font-bold">
									Descripción:
								</label>
								<textarea
									id="description"
									name="description"
									value={product.description}
									onChange={handleInputChange}
									className="border border-color-input p-2 rounded-md w-96 h-32"
								/>
							</div>
							<div className='mt-1'>
								{errors.description && <span className="error bg-color-button-delete text-color-primary p-1 rounded-md">{errors.description}</span>}
							</div>
						</div>
						<div className="flex-col">
							<div>
								<label htmlFor="price" className="block font-bold">
									Precio:
								</label>
								<input
									type="number"
									id="price"
									name="price"
									value={product.price}
									onChange={handleInputChange}
									className="border border-color-input p-2 rounded-md w-96"
								/>
							</div>
							<div className='mt-1'>
								{errors.price && <span className="error bg-color-button-delete text-color-primary p-1 rounded-md">{errors.price}</span>}
							</div>
						</div>
						<div className="flex-col">
							<div>
								<label htmlFor="stock" className="block font-bold">
									Stock:
								</label>
								<input
									type="number"
									id="stock"
									name="stock"
									value={product.stock}
									onChange={handleInputChange}
									className="border border-color-input p-2 rounded-md w-96"
								/>
							</div>
							<div className='mt-1'>
								{errors.stock && <span className="error bg-color-button-delete text-color-primary p-1 rounded-md">{errors.stock}</span>}
							</div>
						</div>
						<div className="flex-col">
							<div>
								<label htmlFor="category" className="block font-bold">
									Categoría:
								</label>
								<select
									id="category"
									name="category"
									value={product.category}
									onChange={handleInputChange}
									className="bg-color-secondary text-color-primary p-2 rounded-md my-2"
								>
									<option value="">Seleccionar categoría</option>
									{categories.map((category) => (
										<option key={category._id} value={category.name}>
											{category.name}
										</option>
									))}
								</select>
							</div>
							<div className='mt-1'>
								{errors.category && <span className="error bg-color-button-delete text-color-primary p-1 rounded-md">{errors.category}</span>}
							</div>
						</div>
						<div className="flex-col">
							<div>
								<label htmlFor="image" className="block font-bold">
									Imagen del Producto:
								</label>
								<input
									type="file"
									id="image"
									name="image"
									accept="image/*"
									onChange={handleImageChange}
									className="border border-color-input p-2 rounded-md w-96"
								/>
							</div>
							<div className='mt-1'>
								{errors.image && <span className="error bg-color-button-delete text-color-primary p-1 rounded-md">{errors.image}</span>}
							</div>
						</div>
						<div className="mt-10">
							<button
								type="submit"
								className="bg-color-secondary w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
							>
								Guardar
							</button>
							<button
								onClick={() => navigate(`/product/${productId}`)}
								className="bg-color-button-delete w-32 md:w-40 text-color-primary font-bold py-2 px-4 rounded mr-5"
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditProductPage;
