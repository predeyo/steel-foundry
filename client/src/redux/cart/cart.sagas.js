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

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* updateFirebaseCartItems() {
  const currentUser = yield select(selectCurrentUser);
  if (!currentUser) return;
  try {
    const cartItems = yield select(selectCartItems);
    yield call(updateUserCartItems(currentUser, cartItems));
    yield put(updateCartInFirebaseSuccess());
  } catch (error) {
    yield console.error("Unable to update firebase cart items", error);
  }
}

function* setCartFromFirebaseOnSignIn() {
  const currentUser = yield select(selectCurrentUser);
  const { cartItems } = yield currentUser;
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

export function* onAddItem() {
  yield takeLatest(CartActionTypes.ADD_ITEM, updateFirebaseCartItems);
}
export function* onRemoveItem() {
  yield takeLatest(CartActionTypes.REMOVE_ITEM, updateFirebaseCartItems);
}
export function* onClearItem() {
  yield takeLatest(
    CartActionTypes.CLEAR_ITEM_FROM_CART,
    updateFirebaseCartItems
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onAddItem),
    call(onSignInSuccess),
    call(onRemoveItem),
    call(onClearItem)
  ]);
}
