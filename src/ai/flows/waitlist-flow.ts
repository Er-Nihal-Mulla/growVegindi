
'use server';
/**
 * @fileOverview A Genkit flow for adding users to a waitlist in Firestore.
 *
 * - addToWaitlist - A function that saves a user's name and email to the 'waitlist' collection.
 * - AddToWaitlistInput - The input type for the addToWaitlist function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, App } from 'firebase-admin/app';

const AddToWaitlistInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  email: z.string().email().describe('The email of the user.'),
  mobile: z.string().describe('The mobile number of the user.'),
});
export type AddToWaitlistInput = z.infer<typeof AddToWaitlistInputSchema>;

// Initialize Firebase Admin SDK
function getFirebaseApp(): App {
    if (getApps().length) {
        return getApps()[0];
    }
    return initializeApp();
}

const db = getFirestore(getFirebaseApp());

const addToWaitlistFlow = ai.defineFlow(
  {
    name: 'addToWaitlistFlow',
    inputSchema: AddToWaitlistInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    try {
      await db.collection('waitlist').add({
        name: input.name,
        email: input.email,
        mobile: input.mobile,
        createdAt: new Date(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      return { success: false };
    }
  }
);

export async function addToWaitlist(input: AddToWaitlistInput): Promise<{ success: boolean }> {
    return addToWaitlistFlow(input);
}
