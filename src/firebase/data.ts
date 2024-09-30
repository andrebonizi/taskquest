import type { User } from 'firebase/auth';

import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { formatUser } from '../data/user';

function getUserDoc(db: Firestore, id: string): Promise<DocumentData> {
  return getDoc(doc(db, 'users', id));
}

export async function getUser(db: Firestore, id: string) {
  const snapshot = await getUserDoc(db, id);
  return snapshot.data();
}

export async function storeUser(db: Firestore, user: User): Promise<void> {
  if ((await getUserDoc(db, user.uid)).exists()) return;
  return await setDoc(doc(collection(db, 'users'), user.uid), formatUser(user));
}
