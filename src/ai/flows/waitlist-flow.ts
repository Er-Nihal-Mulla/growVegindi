// src/ai/flows/waitlist-flow.ts
import { db } from "@/services/firebase";
import { collection, addDoc } from "firebase/firestore";

export const addToWaitlist = async (data: { name: string; email: string; mobile: string }) => {
  try {
    await addDoc(collection(db, "waitlist"), {
      fullName: data.name,
      emailId: data.email,
      mobileNo: data.mobile,
      createdAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return { success: false };
  }
};
