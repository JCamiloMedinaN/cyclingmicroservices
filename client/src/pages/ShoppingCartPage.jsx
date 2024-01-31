import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useAuth } from '../context/AuthContext';

const ShoppingCartPage = () => {
  const [carrito, setCarrito] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const carritoData = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoData);
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
    let total = 0;
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

  const limpiarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const handleRealizarCompra = async () => {
    try {
      if (carrito.length === 0) {
        alert("El carrito está vacío. Añade productos antes de realizar la compra");
        return;
      }
      const simplifiedProducts = carrito.map((producto) => ({
        productId: producto._id,
        quantity: producto.cantidad,
      }));
      const response = await axios.post("http://localhost:4002/api/realizar-compra", {
        products: simplifiedProducts,
      });
      console.log(response.data.message);
      alert(response.data.message);
      if (response.data.message === "Compra realizada exitosamente") {
        limpiarCarrito();
        const pdf = new jsPDF();
        const fontSize = 12;
        pdf.setFontSize(fontSize);
        pdf.text("Cycling - Factura de compra", 14, 20);
        const currentDate = new Date().toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
        const currentTime = new Date().toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        pdf.setFontSize(fontSize - 1);
        pdf.text(`Fecha: ${currentDate}`, 14, 30);
        pdf.text(`Hora: ${currentTime}`, 14, 40);
        pdf.text(`Usuario: ${user.username}`, 14, 50);
        pdf.text(`Email: ${user.email}`, 14, 60);
        const tableStartY = 68;
        pdf.setFontSize(fontSize);
        const columns = ["Producto", "Cantidad", "Precio Unitario", "Total"];
        const data = carrito.map((producto) => [
          producto.name,
          producto.cantidad,
          `$${producto.price}`,
          `$${producto.valortotal}`,
        ]);
        pdf.autoTable({
          head: [columns],
          body: data,
          startY: tableStartY,
        });
        pdf.setFontSize(fontSize - 2);
        pdf.text(`Valor Total: $${sumarTotal(carrito)}`, 144, pdf.autoTable.previous.finalY + 10);
        pdf.save("resumen_compra.pdf");
      }
    } catch (error) {
      console.error("Error al realizar la compra", error.response.data.message);
      alert(error.response.data.message);
    }
  };
    
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

      {/* <button onClick={() => { console.log(carrito) }} >Carrito en consola</button> */}

      <div className="flex justify-center">
        <button
          onClick={handleRealizarCompra}
          className="bg-color-button-delete text-color-primary mt-20 mb-20 rounded w-32 h-10 mr-4"
          type="button"
        >
          Realizar Compra
        </button>

        <button
          onClick={() => limpiarCarrito()}
          className="bg-color-button-delete text-color-primary mt-20 mb-20 rounded w-32 h-10"
          type="button"
        >
          Limpiar Carrito
        </button>

      </div>

    </div>

  );

};

export default ShoppingCartPage;
