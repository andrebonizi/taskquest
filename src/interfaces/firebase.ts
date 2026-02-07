import type { DocumentData, DocumentSnapshot } from 'firebase/firestore';

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
