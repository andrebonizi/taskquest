import type { FirebaseApp } from 'firebase/app';
import type { Auth, AuthProvider, User, UserCredential } from 'firebase/auth';

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from 'firebase/auth';
import { GOOGLE_ACCESS_TOKEN } from '../utils/constants';

export const AUTH_PROVIDER = new GoogleAuthProvider();

export function getFirebaseAuth(app: FirebaseApp): Auth {
  console.log('Getting Firebase Auth');
  return getAuth(app);
}

export function login(auth: Auth, provider: AuthProvider) {
  signInWithPopup(auth, provider)
    .then((result: UserCredential) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem(GOOGLE_ACCESS_TOKEN, token);
      // The signed-in user info.
      const user: User = result.user;
      console.log('You are logged as ', user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const code = error.code;
      const msg = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.error(`${code} - ${msg}`);
    });
}

export function logout(auth: Auth) {
  console.log('logging out...');
  signOut(auth);
}
