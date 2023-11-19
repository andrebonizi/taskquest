import type { Snapshot } from '../interfaces/firebase';

import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

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

async function getUserSnapshot(db, user): Promise<Snapshot> {
  const userRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userRef);

  return userSnapshot;
}

export async function getUser(db, user) {
  const docSnap = await getUserSnapshot(db, user);

  if (docSnap.exists()) {
    const userDoc = docSnap.data();
    console.log('User already exists!', userDoc);
    return userDoc;
  } else {
    console.log('New user!', user);
    return storeUser(db, user);
  }
}

export function formatUser(user) {
  const formatted = {
    name: user.displayName,
    photoSrc: user.photoURL,
    uid: user.uid,
  };

  return formatted;
}

export async function isUserStored(db, user) {
  console.log('checking user: ', user);
  const docSnap = await getUserSnapshot(db, user);
  return docSnap.exists();
}

export async function storeUser(db, user) {
  if (await isUserStored(db, user)) return;

  console.log('User is being saved...');
  const usersRef = collection(db, 'users');
  await setDoc(doc(usersRef, user.uid), formatUser(user));
  console.log(user.displayName, ' was saved on database.');
}

export function getFirstName(user): string {
  if (!user) return 'Unknown';
  return user.displayName.split(' ')[0];
}
