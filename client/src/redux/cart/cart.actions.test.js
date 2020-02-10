import CartActionTypes from "./cart.types.js";
import {
  toggleCartHidden,
  addItem,
  removeItem,
  clearItemFromCart,
  clearCart,
  setCartFromFirebase,
  updateCartInFirebaseSuccess
} from "./cart.actions.js";

describe("Cart Actions", () => {
  it("should dispatch TOGGLE_CART_HIDDEN when toggleCartHidden is called", () => {
    expect(toggleCartHidden()).toEqual({
      type: CartActionTypes.TOGGLE_CART_HIDDEN
    });
  });
  it("should dispatch ADD_ITEM when addItem is called", () => {
    let mockItem = { id: 42 };
    expect(addItem(mockItem)).toEqual({
      type: CartActionTypes.ADD_ITEM,
      payload: mockItem
    });
  });
  it("should dispatch REMOVE_ITEM when removeItem is called", () => {
    let mockItem = { id: 42 };
    expect(removeItem(mockItem)).toEqual({
      type: CartActionTypes.REMOVE_ITEM,
      payload: mockItem
    });
  });
  it("should dispatch CLEAR_ITEM_FROM_CART when clearItemFromCart is called", () => {
    let mockItem = { id: 42 };
    expect(clearItemFromCart(mockItem)).toEqual({
      type: CartActionTypes.CLEAR_ITEM_FROM_CART,
      payload: mockItem
    });
  });
  it("should dispatch CLEAR_CART when clearCart is called", () => {
    expect(clearCart()).toEqual({
      type: CartActionTypes.CLEAR_CART
    });
  });
  it("should dispatch SET_CART_FROM_FIREBASE when setCartFromFirebase is called", () => {
    let mockItems = [{ id: 42 }, { id: 442 }];
    expect(setCartFromFirebase(mockItems)).toEqual({
      type: CartActionTypes.SET_CART_FROM_FIREBASE,
      payload: mockItems
    });
  });
  it("should dispatch UPDATE_CART_IN_FIREBASE_SUCCESS when updateCartInFirebaseSuccess is called", () => {
    expect(updateCartInFirebaseSuccess()).toEqual({
      type: CartActionTypes.UPDATE_CART_IN_FIREBASE_SUCCESS
    });
  });
});
