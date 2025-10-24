// src/components/Cart.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  applyCoupon,
} from "../redux/actions";

function Cart() {
  const { cart, discount } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");

  const total = cart.reduce((acc, p) => acc + p.price * p.qty, 0);
  const discountAmount = (total * discount) / 100;
  const finalTotal = total - discountAmount;

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map((p) => (
        <div key={p.id}>
          {p.name} – ₹{p.price} x {p.qty}
          <button onClick={() => dispatch(increaseQty(p.id))}>+</button>
          <button onClick={() => dispatch(decreaseQty(p.id))}>-</button>
          <button onClick={() => dispatch(removeFromCart(p.id))}>Remove</button>
        </div>
      ))}
      <p>Total: ₹{total}</p>
      {discount > 0 && <p>Discount: ₹{discountAmount}</p>}
      <p>Final Total: ₹{finalTotal}</p>
      <div>
        <input
          placeholder="Enter coupon"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button onClick={() => dispatch(applyCoupon(couponCode))}>Apply</button>
      </div>
    </div>
  );
}

export default Cart;
