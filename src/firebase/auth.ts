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
  return getAuth(app);
}

export function signin(auth: Auth, provider: AuthProvider) {
  signInWithPopup(auth, provider)
    .then((result: UserCredential) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      localStorage.setItem(GOOGLE_ACCESS_TOKEN, credential.accessToken);
      console.log('You are logged as ', (result.user as User).displayName);
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

export function signout(auth: Auth) {
  console.log('logging out...');
  signOut(auth);
  location.reload();
}
