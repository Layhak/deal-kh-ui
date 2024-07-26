import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    email,
    password,
    confirmedPassword,
    firstName,
    lastName,
    username,
    gender,
    phoneNumber,
    dob,
    location,
  } = body;

  const response = await fetch(`${process.env.DEALKH_API_URL}auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      confirmedPassword,
      firstName,
      lastName,
      username,
      gender,
      phoneNumber,
      dob,
      location,
    }),
  });

  const responseBody = await response.json();

  return NextResponse.json(responseBody, {
    status: response.status,
  });
}
