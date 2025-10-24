// src/redux/actions.js
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QTY = "INCREASE_QTY";
export const DECREASE_QTY = "DECREASE_QTY";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const APPLY_COUPON = "APPLY_COUPON";

// Action Creators
export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const increaseQty = (id) => ({ type: INCREASE_QTY, payload: id });
export const decreaseQty = (id) => ({ type: DECREASE_QTY, payload: id });
export const addToWishlist = (product) => ({
  type: ADD_TO_WISHLIST,
  payload: product,
});
export const removeFromWishlist = (id) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: id,
});
export const applyCoupon = (code) => ({ type: APPLY_COUPON, payload: code });
