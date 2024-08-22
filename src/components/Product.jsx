import React from 'react';
import { Button } from '@mui/material';
import '../css/product.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const navigate = useNavigate();
    const { id, price, image, title, description } = product;

    return (
        <div className="product">
            <img  src={image} alt={title} />
            <div className="product-content">
                <p className="title">{title}</p>
                <p className="price">{price} $</p>
                <Button onClick={() => navigate("/product-details/" + id)} variant="contained" color="grey" className="add-button">
                    Product Details
                </Button>
            </div>
        </div>
    );
}


export default Product;
