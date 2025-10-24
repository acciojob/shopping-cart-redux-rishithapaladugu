// src/redux/reducers.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  APPLY_COUPON,
} from "./actions";

const initialState = {
  cart: [],
  wishlist: [],
  discount: 0,
  coupons: {
    SAVE10: 10,
    SAVE20: 20,
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const alreadyInCart = state.cart.find((p) => p.id === action.payload.id);
      if (alreadyInCart) {
        return {
          ...state,
          cart: state.cart.map((p) =>
            p.id === action.payload.id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload),
      };

    case INCREASE_QTY:
      return {
        ...state,
        cart: state.cart.map((p) =>
          p.id === action.payload ? { ...p, qty: p.qty + 1 } : p
        ),
      };

    case DECREASE_QTY:
      return {
        ...state,
        cart: state.cart.map((p) =>
          p.id === action.payload && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
        ),
      };

    case ADD_TO_WISHLIST:
      if (state.wishlist.find((p) => p.id === action.payload.id)) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((p) => p.id !== action.payload),
      };

    case APPLY_COUPON:
      const couponDiscount = state.coupons[action.payload.toUpperCase()] || 0;
      return { ...state, discount: couponDiscount };

    default:
      return state;
  }
}

export default rootReducer;
