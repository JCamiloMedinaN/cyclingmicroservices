import { useEffect, useState } from "react";

const ShoppingCartPage = () => {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const carritoData = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoData);
        // Add the carrito state variable to the dependency array.
    }, []);

    const eliminarDelCarrito = (id) => {
        const index = carrito.findIndex((item) => item._id === id);

        if (index !== -1) {
            carrito.splice(index, 1);

            actualizarCarritoEnLocalStorage(carrito);
            obtenerCarrito();
        }
    };

    const actualizarCarritoEnLocalStorage = (carritoData) => {
        localStorage.setItem("carrito", JSON.stringify(carritoData));
    };

    const obtenerCarrito = () => {
        const carritoData = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoData);
    };

    const sumarTotal = (productos) => {
        // Inicializa el total
        let total = 0;

        // Suma los valores totales de los productos
        for (const producto of productos) {
            total += producto.valortotal;
        }

        return total;
    };

    const sumar = (id) => {
        const item = carrito.find((item) => item._id === id);
        item.cantidad += 1;
        item.valortotal = item.price * item.cantidad;
        setCarrito(carrito);
        actualizarCarritoEnLocalStorage(carrito);
        obtenerCarrito();

    };

    const restar = (id) => {
        const item = carrito.find((item) => item._id === id);
        if (item.cantidad != 1) {
            item.cantidad -= 1;
        }
        item.valortotal = item.price * item.cantidad;
        setCarrito(carrito);
        actualizarCarritoEnLocalStorage(carrito);
        obtenerCarrito();
    };

    if (!carrito) {
        return <div className="text-center mt-16">Cargando...</div>;
    }

    return (
        <div className="App">
            {carrito.map((producto, index) => (
                <div
                    key={index}
                    className="flex justify-around mt-4 mb-4 ml-40 mr-40 border-solid border rounded-lg"
                >
                    <div className=" flex justify-around w-48 mt-5 mb-5 ml-5 mr-5">
                        <img
                            src={producto.image}
                        />
                    </div>

                    <div className="">
                        <strong><h3 className="text-2xl mt-10 mb-10">{producto.name}</h3></strong>
                        <br />
                        <strong><a className="text-2xl">{producto.valortotal}</a></strong>
                    </div>

                    <button onClick={() => restar(producto._id)}
                        className="bg-color-secondary text-color-primary mt-20 mb-20 rounded w-10 h-10"
                        type="button">-</button>
                    <a className="mt-20 mb-20">{producto.cantidad}</a>
                    <button onClick={() => sumar(producto._id)}
                        className="bg-color-secondary text-color-primary mt-20 mb-20 rounded w-10 h-10"
                        type="button">+</button>
                    <button
                        onClick={() => eliminarDelCarrito(producto._id)}
                        className="bg-color-button-delete text-color-primary mt-20 mb-20 rounded w-32 h-10"
                        type="button"><p className="">Eliminar</p></button>
                </div>

            ))}

            <div className="flex justify-around ml-60 mr-60 border-solid border rounded-lg">
                <strong><h3 className="text-2xl mt-10 mb-10">Valor Total:</h3></strong>

                <strong><h3 className="text-2xl mt-10 mb-10">{sumarTotal(carrito)}</h3></strong>
            </div>

        </div>
    );
};

export default ShoppingCartPage;
