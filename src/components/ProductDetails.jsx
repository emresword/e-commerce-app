import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct, getAllProducts } from '../redux/slices/productSlice';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Button } from '@mui/material';
import { addToBasket } from '../redux/slices/basketSlice';

function ProductDetails() {
    const { id } = useParams();
    const { products, selectedProduct, loading } = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    const addBasket = () => {
        if (selectedProduct) {
            const { price, image, title, description } = selectedProduct; // Destructure properties from selectedProduct
            const payload = {
                id,
                price,
                image,
                title,
                description,
                count
            };
            dispatch(addToBasket(payload)); // Pass payload to addToBasket action
        }
    };

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    useEffect(() => {
        dispatch(getAllProducts()); // Fetch products when component mounts
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            getProductById();
        }
    }, [products, id]);

    const getProductById = () => {
        const product = products.find((product) => product.id.toString() === id);
        if (product) {
            dispatch(setSelectedProduct(product));
        } else {
            console.log("Product not found for ID:", id);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
            <h3 style={{ marginBottom: "50px" }}>Product Details</h3>
            {loading ? (
                <p>Loading...</p>
            ) : selectedProduct ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div className="product" style={{ marginBottom: "20px" }}>
                        <img src={selectedProduct.image} alt={selectedProduct.title} style={{ maxWidth: "300px", height: "auto" }} />
                    </div>

                    <p><strong>Title:</strong> {selectedProduct.title}</p>
                    <h3><strong>Price:</strong> {selectedProduct.price} $</h3>
                    <p><strong>Description:</strong> {selectedProduct.description}</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <CiCirclePlus onClick={increment} style={{ fontSize: '40px', cursor: 'pointer' }} />
                        <span style={{ fontSize: '35px', margin: '0 20px' }}>{count}</span>
                        <CiCircleMinus onClick={decrement} style={{ fontSize: '40px', cursor: 'pointer' }} />
                    </div>
                    <Button onClick={addBasket} variant="contained" color="primary" className="add-button">
                        Add to Basket
                    </Button>
                </div>
            ) : (
                <p>No product found</p>
            )}
        </div>
    );
}

export default ProductDetails;
