import type { FirebaseUser, Snapshot } from '../interfaces/firebase';

import {
  DocumentData,
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { User } from '../interfaces/user';

export const player = {
  name: '',
  life: 10,
  power: 1,
  guard: 0,
  speed: 1,
  gold: 10,
  xp: 0,
  level: 1,
  inventory: [],
  equip: {
    weapon: 0,
    armor: 0,
    misc: 0,
  },
};

async function getSnapshot(
  db: Firestore,
  user: FirebaseUser
): Promise<Snapshot> {
  const userRef = doc(db, 'users', user.uid);
  try {
    const userSnapshot = await getDoc(userRef);
    return userSnapshot;
  } catch (e) {
    throw new Error(`Error on get firestore doc. \n ${e}`);
  }
}

function getSnapData(snap: Snapshot): DocumentData {
  return snap.data();
}

export async function sincUser(db: Firestore, user: FirebaseUser) {
  const docSnap = await getSnapshot(db, user);

  if (docSnap.exists()) {
    const userDoc = getSnapData(docSnap);
    console.log('User already exists!', userDoc);
    return userDoc;
  } else {
    console.log('New user!', user);
    storeUser(db, user);
  }
}

export function formatUser(user: FirebaseUser): Partial<User> {
  const formattedUser = {
    name: user.displayName,
    photoSrc: user.photoURL,
    id: user.uid,
  };

  return formattedUser;
}

export async function isUserStored(
  db: Firestore,
  user: FirebaseUser
): Promise<boolean> {
  return (await getSnapshot(db, user)).exists();
}

export async function storeUser(db: Firestore, user: FirebaseUser) {
  if (await isUserStored(db, user)) return;

  console.log('User is being saved...');
  const usersRef = collection(db, 'users');
  const result = await setDoc(doc(usersRef, user.uid), formatUser(user));
  console.log(user.displayName, ' was saved on database. ', result);
}

export function getFirstName(user: FirebaseUser): string {
  if (!user) return 'Unknown';

  return user.displayName.split(' ')[0];
}
