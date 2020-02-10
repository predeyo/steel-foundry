import CartActionTypes from "./cart.types.js";
// import { addItemToCart, removeItemFromCart } from "./cart.utils.js";
import cartReducer from "./cart.reducer.js";

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

describe("Cart Reducer", () => {
  let state;
  beforeEach(() => {
    state = INITIAL_STATE;
  });

  it("should return initial state", () => {
    expect(cartReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  it("should toggle hidden value on TOGGLE_CART_HIDDEN action", () => {
    let action = {
      type: CartActionTypes.TOGGLE_CART_HIDDEN
    };
    expect(cartReducer(state, action).hidden).toBe(false);
  });
  it("should add item to cart on ADD_ITEM action", () => {
    let item = { id: 10 };
    let action = {
      type: CartActionTypes.ADD_ITEM,
      payload: item
    };
    expect(cartReducer(state, action).cartItems).toEqual([
      { ...item, quantity: 1 }
    ]);
  });
  it("should increase quantity of item if ADD_ITEM is called with matching item id", () => {
    let item = { id: 10 };
    state.cartItems = [{ id: 2, quantity: 1 }, { id: 10, quantity: 41 }];
    let action = {
      type: CartActionTypes.ADD_ITEM,
      payload: item
    };
    expect(cartReducer(state, action).cartItems[1].quantity).toBe(42);
  });
  it("should decrease quantity of item if REMOVE_ITEM is called with matching item id", () => {
    let item = { id: 10 };
    state.cartItems = [{ id: 2, quantity: 1 }, { id: 10, quantity: 41 }];
    let action = {
      type: CartActionTypes.REMOVE_ITEM,
      payload: item
    };
    expect(cartReducer(state, action).cartItems[1].quantity).toBe(40);
  });
  it("should remove item array if CLEAR_ITEM_FROM_CART is called with matching item id", () => {
    let item = { id: 10 };
    state.cartItems = [{ id: 2, quantity: 1 }, { id: 10, quantity: 41 }];
    let action = {
      type: CartActionTypes.CLEAR_ITEM_FROM_CART,
      payload: item
    };
    expect(cartReducer(state, action).cartItems).toEqual([
      { id: 2, quantity: 1 }
    ]);
  });
  it("should clear all items if CLEAR_CART is called", () => {
    state.cartItems = [{ id: 2, quantity: 1 }, { id: 10, quantity: 41 }];
    let action = {
      type: CartActionTypes.CLEAR_CART
    };
    expect(cartReducer(state, action).cartItems).toEqual([]);
  });
  it("should add add payload items to current items if SET_CART_FROM_FIREBASE is called", () => {
    let items = [{ id: 2, quantity: 1 }, { id: 10, quantity: 41 }];
    state.cartItems = [];
    let action = {
      type: CartActionTypes.SET_CART_FROM_FIREBASE,
      payload: items
    };
    expect(cartReducer(state, action).cartItems).toEqual(items);
  });
});
