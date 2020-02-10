import { takeLatest, put, call } from "redux-saga/effects";

import UserActionTypes from "./user.types.js";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from "./user.actions.js";

import {
  auth,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.utils.js";

import {
  getSnapshotFromUserAuth,
  signInWithGoogle,
  signInWithEmail,
  isUserAuthenticated,
  signOut,
  signUpWithEmailAndPassword,
  signInAfterSignUp,
  onGoogleSignInStart,
  onEmailSignInStart,
  onCheckUserSession,
  onSignOutStart,
  onSignUpStart,
  onSignUpSuccess
} from "./user.sagas.js";

describe("onSignUpSuccess saga", () => {
  it("should be triggered on SIGN_UP_SUCCESS", () => {
    const generator = onSignUpSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
    );
  });
});

describe("onSignUpStart saga", () => {
  it("should be triggered on SIGN_UP_START", () => {
    const generator = onSignUpStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_START, signUpWithEmailAndPassword)
    );
  });
});

describe("onSignOutStart saga", () => {
  it("should be triggered on SIGN_OUT_START", () => {
    const generator = onSignOutStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
    );
  });
});

describe("onCheckUserSession saga", () => {
  it("should be triggered on CHECK_USER_SESSION", () => {
    const generator = onCheckUserSession();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
    );
  });
});

describe("onEmailSignInStart saga", () => {
  it("should be triggered on EMAIL_SIGN_IN_START", () => {
    const generator = onEmailSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
    );
  });
});

describe("onGoogleSignInStart saga", () => {
  it("should be triggered on GOOGLE_SIGN_IN_START", () => {
    const generator = onGoogleSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
    );
  });
});

describe("signInAfterSignUp saga", () => {
  it("should call getSnapshotFromUserAuth", () => {
    const mockUser = {};
    const mockAdditionalData = {};
    const mockAction = {
      payload: {
        user: mockUser,
        additionalData: mockAdditionalData
      }
    };
    const generator = signInAfterSignUp(mockAction);
    expect(generator.next().value).toEqual(
      getSnapshotFromUserAuth(mockUser, mockAdditionalData)
    );
  });
});

describe("signUpWithEmailAndPassword saga", () => {
  const mockEmail = "yime@taro.com";
  const mockPassword = "tarantelllo123";
  const mockDisplayName = "Yim Parkin";
  const mockAction = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName
    }
  };
  const generator = signUpWithEmailAndPassword(mockAction);
  it("should call auth.createUserWithEmailAndPassword", () => {
    const createUserWithEmailAndPassword = jest.spyOn(
      auth,
      "createUserWithEmailAndPassword"
    );
    generator.next();
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
  it("should dispatch SIGN_UP_SUCCESS if user exists", () => {
    const user = { uid: "123" };
    expect(generator.next({ user }).value).toEqual(
      put(
        signUpSuccess({
          user,
          additionalData: { displayName: mockDisplayName }
        })
      )
    );
  });
  it("should dispatch signUpFailure on error", () => {
    const newGenerator = signUpWithEmailAndPassword(mockAction);
    newGenerator.next();
    expect(newGenerator.throw("error").value).toEqual(
      put(signUpFailure("error"))
    );
  });
});

describe("signOut saga", () => {
  const generator = signOut();
  it("should call auth.signOut", () => {
    const signOut = jest.spyOn(auth, "signOut");
    generator.next();
    expect(signOut).toHaveBeenCalled();
  });
  it("should put signOutSuccess", () => {
    expect(generator.next().value).toEqual(put(signOutSuccess()));
  });
  it("should put signOutFailure if error occcurred", () => {
    const newGenerator = signOut();
    newGenerator.next();
    expect(newGenerator.throw("error").value).toEqual(
      put(signOutFailure("error"))
    );
  });
});
describe("isUserAuthenticated saga", () => {
  const generator = isUserAuthenticated();
  it("should call getCurrentUser", () => {
    expect(generator.next().value).toEqual(getCurrentUser());
  });
  it("should call getSnapshotFromUserAuth if user exists", () => {
    const mockUserAuth = { uid: "88" };
    expect(generator.next(mockUserAuth).value).toEqual(
      getSnapshotFromUserAuth(mockUserAuth)
    );
  });
  it("should put signInFailure if error occcurred", () => {
    const newGenerator = isUserAuthenticated();
    newGenerator.next();
    expect(newGenerator.throw("error").value).toEqual(
      put(signInFailure("error"))
    );
  });
});

describe("signInWithEmail saga", () => {
  const mockAction = {
    payload: {
      email: "",
      password: ""
    }
  };
  const generator = signInWithEmail(mockAction);
  it("should call getCurrentUser", () => {
    const signInWithEmailAndPassword = jest.spyOn(
      auth,
      "signInWithEmailAndPassword"
    );
    generator.next();
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
  it("should call getSnapshotFromUserAuth if user exists", () => {
    const mockUserAuth = { uid: "88" };
    expect(generator.next({ user: mockUserAuth }).value).toEqual(
      getSnapshotFromUserAuth(mockUserAuth)
    );
  });
  it("should put signInFailure if error occcurred", () => {
    const newGenerator = signInWithEmail(mockAction);
    newGenerator.next();
    expect(newGenerator.throw("error").value).toEqual(
      put(signInFailure("error"))
    );
  });
});

describe("signInWithGoogle saga", () => {
  const generator = signInWithGoogle();
  it("should call signInWithPopup", () => {
    const signInWithPopup = jest.spyOn(auth, "signInWithPopup");
    generator.next();
    expect(signInWithPopup).toHaveBeenCalled();
  });
  it("should call getSnapshotFromUserAuth if user exists", () => {
    const mockUserAuth = { uid: "88" };
    expect(generator.next({ user: mockUserAuth }).value).toEqual(
      getSnapshotFromUserAuth(mockUserAuth)
    );
  });
  it("should put signInFailure if error occcurred", () => {
    const newGenerator = signInWithGoogle();
    newGenerator.next();
    expect(newGenerator.throw("error").value).toEqual(
      put(signInFailure("error"))
    );
  });
});

describe("getSnapshotFromUserAuth saga", () => {
  const mockUserAuth = {};
  const mockAdditionalData = {};

  const generator = getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);
  it("should call createUserProfileDocument", () => {
    expect(generator.next().value).toEqual(
      call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
    );
  });
  it("should call userRef.get if userRef exists", () => {
    const mockUserRef = {
      get: jest.fn()
    };
    generator.next(mockUserRef);
    expect(mockUserRef.get).toHaveBeenCalled();
  });
  it("should dispatch signInSuccess if userSnapshot exists", () => {
    const mockUserSnapshot = {
      id: 55,
      data: () => {}
    };
    expect(generator.next(mockUserSnapshot).value).toEqual(
      put(
        signInSuccess({ id: mockUserSnapshot.id, ...mockUserSnapshot.data() })
      )
    );
  });

  it("should put signInFailure if error occcurred", () => {
    const newGenerator = getSnapshotFromUserAuth();
    newGenerator.next();
    expect(newGenerator.throw("error").value).toEqual(
      put(signInFailure("error"))
    );
  });
});
