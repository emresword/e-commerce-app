import { createSlice } from "@reduxjs/toolkit";

const writeFromBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

const getBasketFromStorage = () => {
  return localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];
};

const initialState = {
  products: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findProduct = state.products.find((product) => product.id === action.payload.id);
      if (findProduct) {
        findProduct.count += action.payload.count;
      } else {
        state.products = [...state.products, { ...action.payload, count: 1 }];
      }
      writeFromBasketToStorage(state.products);
    },
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    calculateBasket: (state) => {
      state.totalAmount = 0;
      state.products.forEach((product) => {
        state.totalAmount += product.price * product.count;
      });
    },
  },
});

export const { addToBasket, setDrawer, calculateBasket } = basketSlice.actions;
export default basketSlice.reducer;