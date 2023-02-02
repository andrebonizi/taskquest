import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const player = {
    name: '',
    life: 10,
    power: 1,
    guard: 0,
    speed: 1,
    gold: 0,
    xp: 0,
    level: 1,
    inventory: [],
    equip: {
        weapon: 0,
        armor: 0,
        misc: 0,
    },
}

export async function getUser(db, user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const userDoc =  await docSnap.data();
        
        return userDoc;
    } else {
        console.log('New user!', user)
        return storeUser(db, user);
    }
}

export function formatUser(user) {
    const formatted = {
        uid: user.uid,
        name: user.displayName,
        photoSrc: user.photoURL,
        player: {
            life: 10,
            power: 1,
            guard: 0,
            speed: 1,
            gold: 0,
            xp: 0,
            level: 1,
            inventory: [],
            equip: {
                weapon: 0,
                armor: 0,
                misc: 0,
            },
        }
    }

    return formatted;
}

export async function isUserStored(db, user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    return docSnap.exists();
}

export async function storeUser(db, user) {
    if (isUserStored(db, user)) return;

    console.log('User is being stored...');
    const usersRef = collection(db, "users");
    await setDoc(
        doc(
            usersRef,
            user.uid
        ), 
        formatUser(user)
    );
    console.log(user.displayName, ' was saved on database.');
}

export function getFirstName(user): string {
    if (!user) return '';

    const name = user.displayName.split(' ')[0];
    return name;
}