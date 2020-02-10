import { all, call, takeLatest, put, select } from "redux-saga/effects";

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

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* updateFirebaseCartItems() {
  const currentUser = yield select(selectCurrentUser);
  if (!currentUser) return;
  try {
    const cartItems = yield select(selectCartItems);
    yield call(updateUserCartItems, currentUser, cartItems);
    // Possible future integrations with cart update success for firebase - but currenty not in use
    yield put(updateCartInFirebaseSuccess());
  } catch (error) {
    yield console.error("Unable to update firebase cart items", error);
  }
}

export function* setCartFromFirebaseOnSignIn() {
  const { cartItems } = yield select(selectCurrentUser);
  if (cartItems && cartItems.length > 0) {
    yield put(setCartFromFirebase(cartItems));
  }
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onSignInSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS,
    setCartFromFirebaseOnSignIn
  );
}

export function* onCartUpdate() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART
    ],
    updateFirebaseCartItems
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onCartUpdate),
    call(onSignInSuccess)
  ]);
}
