import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import "./../styles/App.css";


const initialState = {
  cart: {},
  wishlist: {},
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload;
      if (state.cart[p.id]) state.cart[p.id].qty += 1;
      else state.cart[p.id] = { product: p, qty: 1 };
    },
    removeFromCart: (state, action) => {
      delete state.cart[action.payload];
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      if (state.cart[id]) state.cart[id].qty += 1;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      if (state.cart[id]) {
        state.cart[id].qty -= 1;
        if (state.cart[id].qty <= 0) delete state.cart[id];
      }
    },
    addToWishlist: (state, action) => {
      const p = action.payload;
      state.wishlist[p.id] = p;
    },
    removeFromWishlist: (state, action) => {
      delete state.wishlist[action.payload];
    },
  },
});

const store = configureStore({ reducer: { shop: shopSlice.reducer } });


const PRODUCTS = [
  { id: "1", title: "T-Shirt", price: 499 },
  { id: "2", title: "Sneakers", price: 2499 },
  { id: "3", title: "Backpack", price: 1299 },
  { id: "4", title: "Watch", price: 3999 },
];


const Navbar = () => (
  <nav className="navbar-expand-lg">
    <h2 className="text-center">Shopping Cart</h2>
  </nav>
);

const ProductList = () => {
  const dispatch = useDispatch();
  const { wishlist, cart } = useSelector((s) => s.shop);

  return (
    <div className="product-list container">
      <div className="row">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="col custom-card card m-2 p-2">
            <div className="card-body">
              <h5 className="card-title">{p.title}</h5>
              <p className="card-text">₹{p.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => dispatch(shopSlice.actions.addToCart(p))}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-secondary m-1"
                onClick={() =>
                  wishlist[p.id]
                    ? dispatch(shopSlice.actions.removeFromWishlist(p.id))
                    : dispatch(shopSlice.actions.addToWishlist(p))
                }
              >
                {wishlist[p.id] ? "Remove Wishlist" : "Add Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart } = useSelector((s) => s.shop);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h3>Cart Items</h3>
      {Object.values(cart).length === 0 && <p>No items in cart</p>}
      {Object.values(cart).map((it) => (
        <div key={it.product.id} className="custom-card card mb-2 p-2">
          <div className="card-body">
            <p>
              {it.product.title} - ₹{it.product.price} × {it.qty}
            </p>
            <button
              className="btn btn-success"
              onClick={() =>
                dispatch(shopSlice.actions.increaseQty(it.product.id))
              }
            >
              +
            </button>
            <button
              className="btn btn-warning m-1"
              onClick={() =>
                dispatch(shopSlice.actions.decreaseQty(it.product.id))
              }
            >
              -
            </button>
            <button
              className="btn btn-danger"
              onClick={() =>
                dispatch(shopSlice.actions.removeFromCart(it.product.id))
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Wishlist = () => {
  const { wishlist } = useSelector((s) => s.shop);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h3>Wishlist</h3>
      {Object.values(wishlist).length === 0 && <p>No items in wishlist</p>}
      {Object.values(wishlist).map((p) => (
        <div key={p.id} className="custom-card card mb-2 p-2">
          <div className="card-body">
            <p>
              {p.title} - ₹{p.price}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(shopSlice.actions.addToCart(p))}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-danger m-1"
              onClick={() =>
                dispatch(shopSlice.actions.removeFromWishlist(p.id))
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


const MainApp = () => (
  <div>
    <Navbar />
    <ProductList />
    <Cart />
    <Wishlist />
  </div>
);

const App = () => (
  <div>
    {/* Do not remove the main div */}
    <Provider store={store}>
      <MainApp />
    </Provider>
  </div>
);

export default App;      
