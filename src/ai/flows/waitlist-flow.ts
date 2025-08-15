// src/ai/flows/waitlist-flow.ts
import db from "@/services/firebase-admin";

export const addToWaitlist = async (data: { name: string; email?: string | null; mobile: string }) => {
  try {
    const docRef = await db.collection("waitlist").add({
      fullName: data.name,
      emailId: data.email || null,
      mobileNo: data.mobile,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return { success: false };
  }
};
