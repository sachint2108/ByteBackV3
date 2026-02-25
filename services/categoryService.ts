import { db } from "@/firebase/config";
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs, addDoc } from "firebase/firestore";

export const categoryService = {

  readCategoryById: async (id: string) => {
    const docRef = doc(db, "Categories", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error("Category Not Found");
  },


  updateCategory: async (id: string, data: any) => {
    const docRef = doc(db, "Categories", id);
    await updateDoc(docRef, data);
  },


  deleteCategory: async (id: string) => {
    const docRef = doc(db, "Categories", id);
    await deleteDoc(docRef);
  },


  readAllCategories: async () => {
    const querySnapshot = await getDocs(collection(db, "Categories"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  createCategory: async (data: any) => {
    const docRef = await addDoc(collection(db, "Categories"), data);
    return docRef.id;
  },

  

};