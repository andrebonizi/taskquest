import { Firestore, collection, getDocs } from "firebase/firestore";
import { User } from "../interfaces/user";

export const users: User[] = [];

export async function getAllUsers(db: Firestore): Promise<User[]> {
   console.log("Chamou");
   const usersRef = collection(db, "users");
   const usersSnapshot = await getDocs(usersRef);

   usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      const user: User = {
         id: doc.id,
         name: userData.name,
         photoSrc: userData.photoSrc,
         player: userData.player,
      };
      users.push(user);
   });

   return users;
}
