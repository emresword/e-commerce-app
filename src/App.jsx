import React, { useEffect } from 'react';
import './App.css';
import { Button } from '@mui/material';
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, setDrawer, removeFromBasket } from './redux/slices/basketSlice';
import Loading from './components/Loading';

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [products, dispatch]); // Recalculate whenever products change

  const handleDelete = (id) => {
    dispatch(removeFromBasket({ id }));
    dispatch(calculateBasket());
  };

  return (
    <div>
      <PageContainer>
        <Header />
      </PageContainer>
      <RouterConfig />
      <Loading/>
      <Drawer anchor="right" open={drawer} onClose={() => dispatch(setDrawer())}>
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <div>
              <p>{product.title} ({product.count})</p>
              <p>{product.price} $</p>
            </div>
            <Button variant="contained" color="primary" onClick={() => handleDelete(product.id)}>
              delete
            </Button>
          </div>
        ))}
        <h2>Total: {totalAmount} $</h2>
        <Button variant="contained" color="primary">
          Paying
        </Button>
      </Drawer>
    </div>
  );
}

export default App;
