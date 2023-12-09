import { db } from "../firebase";
import {collection,addDoc,updateDoc,doc,deleteDoc,} from "firebase/firestore";

const addEvent = async ({ userId, title,date, description, status, }) => {
    try {
        await addDoc(collection(db, "event"), {
        user: userId,
        title: title,
        date: date,
        description:description,
        status: status,
        createdAt: new Date().getTime(),
        });
    } catch (err) {}
};

const toggleEventStatus = async ({ docId, status }) => {
    try {
        const eventRef = doc(db, "event", docId);
        await updateDoc(eventRef, {
        status,
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteEvent = async (docId) => {
    try {
        const eventRef = doc(db, "event", docId);
        await deleteDoc(eventRef);
    } catch (err) {
         console.log(err);
    }
};
export { addEvent, toggleEventStatus, deleteEvent };