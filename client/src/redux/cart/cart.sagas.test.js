import { call, takeLatest, put, select } from "redux-saga/effects";

import UserActionTypes from "../user/user.types.js";
import CartActionTypes from "./cart.types.js";
import {
  clearCart,
  setCartFromFirebase,
  updateCartInFirebaseSuccess
} from "./cart.actions.js";

import { updateUserCartItems } from "../../firebase/firebase.utils.js";
import { selectCurrentUser } from "../user/user.selectors.js";
import { selectCartItems } from "./cart.selectors.js";

import {
  clearCartOnSignOut,
  updateFirebaseCartItems,
  setCartFromFirebaseOnSignIn,
  onSignInSuccess,
  onSignOutSuccess,
  onCartUpdate
} from "./cart.sagas.js";

describe("onSignOutSuccess saga", () => {
  it("should be triggered on SIGN_OUT_SUCCESS", () => {
    const generator = onSignOutSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
    );
  });
});
describe("onSignInSuccess saga", () => {
  it("should be triggered on SIGN_IN_SUCCESS", () => {
    const generator = onSignInSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_IN_SUCCESS, setCartFromFirebaseOnSignIn)
    );
  });
});
describe("onCartUpdate saga", () => {
  it("should be triggered on adding, removign or clearing item", () => {
    const generator = onCartUpdate();
    expect(generator.next().value).toEqual(
      takeLatest(
        [
          CartActionTypes.ADD_ITEM,
          CartActionTypes.REMOVE_ITEM,
          CartActionTypes.CLEAR_ITEM_FROM_CART
        ],
        updateFirebaseCartItems
      )
    );
  });
});
describe("setCartFromFirebaseOnSignIn saga", () => {
  it("should select current user and dispatch setCartFromFirebase if cart items exist", () => {
    const generator = setCartFromFirebaseOnSignIn();
    const mockCartItems = [{ id: 1 }];
    const mockCurrentUser = {
      cartItems: mockCartItems
    };
    expect(generator.next().value).toEqual(select(selectCurrentUser));
    expect(generator.next(mockCurrentUser).value).toEqual(
      put(setCartFromFirebase(mockCartItems))
    );
  });
  it("should return if cart items does not exist", () => {
    const generator = setCartFromFirebaseOnSignIn();
    const mockCartItems = [];
    const mockCurrentUser = {
      cartItems: mockCartItems
    };
    generator.next();
    expect(generator.next(mockCurrentUser).done).toBe(true);
  });
});
describe("updateFirebaseCartItems saga", () => {
  describe("if currentUser exits", () => {
    const generator = updateFirebaseCartItems();
    const mockCartItems = [{ id: 1 }];
    const mockCurrentUser = { id: "25k" };
    it("should select current user", () => {
      expect(generator.next().value).toEqual(select(selectCurrentUser));
    });
    it("should select selectCartItems if currentUser exists", () => {
      expect(generator.next(mockCurrentUser).value).toEqual(
        select(selectCartItems)
      );
    });
    it("should call updateUserCartItems", () => {
      expect(generator.next(mockCartItems).value).toEqual(
        call(updateUserCartItems, mockCurrentUser, mockCartItems)
      );
    });
    it("should dispatch updateCartInFirebaseSuccess", () => {
      expect(generator.next().value).toEqual(
        put(updateCartInFirebaseSuccess())
      );
    });
  });
});
describe("clearCartOnSignOut saga", () => {
  const generator = clearCartOnSignOut();
  it("should dispatch clearCart", () => {
    expect(generator.next().value).toEqual(put(clearCart()));
  });
});
