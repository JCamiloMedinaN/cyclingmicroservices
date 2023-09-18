import React from 'react';

const ProductDetail = ({ product }) => {
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <p>Rating: {product.rating} / 5</p>

            <h3>Comments:</h3>
            <ul>
                {product.comments.map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.author}</strong>
                        <p>{comment.text}</p>
                        <p>Posted on: {new Date(comment.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDetail;
