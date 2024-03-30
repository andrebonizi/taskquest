import type {
  DocumentData,
  DocumentSnapshot,
  Firestore,
} from 'firebase/firestore';

export type Snapshot = DocumentSnapshot<DocumentData>;

export interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface FirebaseUser {
  displayName: string;
  photoURL: URL;
  store: Firestore;
  uid: string;
}
