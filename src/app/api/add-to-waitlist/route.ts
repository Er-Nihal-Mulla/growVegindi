
import db from "@/services/firebase-admin";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, mobile } = await req.json();

    if (!name || !mobile) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    await db.collection('waitlist').add({
      fullName: name,
      emailId: email || null,
      mobileNo: mobile,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
