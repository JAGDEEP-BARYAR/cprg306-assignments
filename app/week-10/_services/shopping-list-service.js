import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, } from "firebase/firestore";

export async function getItems(userId) {
  try {
    const itemsCollection = collection(db, `users/${userId}/items`);
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemList = itemsSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return itemList;
  } catch (error) {
    console.error("Error getting items: ", error);
  }
  console.log(itemList);
}

export async function addItem(userId, item) {
  try {
    const itemsCollection = collection(db, `users/${userId}/items`);
    await addDoc(itemsCollection, item);
  } catch (error) {
    console.error("Error adding item: ", error);
  }
}
// Path: app/week-10/shopping-list/item-list.js