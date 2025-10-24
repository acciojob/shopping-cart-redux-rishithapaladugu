// src/components/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromWishlist } from "../redux/actions";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist.length === 0 && <p>Wishlist is empty</p>}
      {wishlist.map((p) => (
        <div key={p.id}>
          {p.name} – ₹{p.price}
          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
          <button onClick={() => dispatch(removeFromWishlist(p.id))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
