import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function getUser(db, user) {
    if (!user) return null;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const userDoc =  await docSnap.data();
        
        return userDoc;
    } else {
        console.log('New user!', user)
        return saveUser(db, user);
    }
}

export async function saveUser(db, user) {
    const usersRef = collection(db, "users");
    await setDoc(
        doc(
            usersRef,
            user.uid
        ), 
        user
    );
    console.log(user.displayName, ' was saved on database.')
    return user;
}

export function getFirstName(user): string {
    if (!user) return '';

    const name = user.displayName.split(' ')[0];
    return name;
}