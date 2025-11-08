import { NextResponse } from 'next/server';

// THIS IS YOUR GOOGLE SCRIPT URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyeTw-szh_rZBJ9NM3iLh7CkjjesdmAr9ZbsqEqBO5wKX10I7JEvt-vQqvAIVFQTwdg/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Send the data from our form to the Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // Disables caching
      cache: 'no-store',
    });

    const result = await response.json();

    // Check if Google script ran successfully
    if (result.status === 'success') {
      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted successfully' 
      });
    } else {
      // Pass on the error message from Google Apps Script
      throw new Error(result.message || 'Google Apps Script error');
    }

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}