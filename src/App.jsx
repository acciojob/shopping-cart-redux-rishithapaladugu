import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <h1>Shopping Cart – Redux Demo</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <ProductList />
        <Cart />
        <Wishlist />
      </div>
    </div>
  );
}

export default App;
