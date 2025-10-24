// src/components/ProductList.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../redux/actions";

const sampleProducts = [
  { id: 1, name: "Laptop", price: 40000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 3000 },
];

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {sampleProducts.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          {p.name} – ₹{p.price}
          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
          <button onClick={() => dispatch(addToWishlist(p))}>Wishlist</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
