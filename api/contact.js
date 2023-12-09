import { db } from "../firebase";
import {collection,addDoc,updateDoc,doc,deleteDoc,} from "firebase/firestore";

const addContact = async ({ userId, name,phone, description, status }) => {
    try {
        await addDoc(collection(db, "contact"), {
        user: userId,
        name: name,
        phone:phone,
        status: status,
        createdAt: new Date().getTime(),
        });
    } catch (err) {}
};

/*const toggleContactStatus = async ({ docId, status }) => {
    try {
        const contactRef = doc(db, "contact", docId);
        await updateDoc(contactRef, {
        status,
        });
    } catch (err) {
        console.log(err);
    }
};*/

const deleteContact = async (docId) => {
    try {
        const contactRef = doc(db, "contact", docId);
        await deleteDoc(contactRef);
    } catch (err) {
         console.log(err);
    }
};
export { addContact,  deleteContact };//toggleContactStatus