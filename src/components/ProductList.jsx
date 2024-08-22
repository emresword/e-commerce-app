import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice'; // Corrected the import path
import Product from './Product';

function ProductList() {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    console.log(products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
      <div style={{display:"flex",flexWrap:"wrap"}} className="product-list">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    );
    
}

export default ProductList;
