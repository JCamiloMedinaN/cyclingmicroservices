
const ShoppingCartPage = () => {
    return (
        <div>
            <h1>Carrito de Compras</h1>

        </div>
    );
};

export default ShoppingCartPage;



// function ShoppingCartPage({ carrito, vaciarCarrito }) {
//     const total = carrito.reduce((acumulador, product) => acumulador + product.precio, 0);

//     return (
//         <div>
//             <h2>Carrito de Compras</h2>
//             <ul>
//                 {carrito.map((product, index) => (
//                     <li key={index}>
//                         {product.nombre} - ${product.precio}
//                     </li>
//                 ))}
//             </ul>
//             <p>Total: ${total}</p>
//             <button onClick={vaciarCarrito}>Vaciar Carrito</button>
//         </div>
//     );
// }

// export default ShoppingCartPage;
