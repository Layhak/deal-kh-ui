import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { compare } from 'bcryptjs'; // Assuming you are using bcrypt for hashing passwords

// This should be replaced with your database call to get user by email
const getUserByEmail = async (email: string) => {
  // Mock user for demonstration purposes
  const user = {
    id: 1,
    email: 'user@example.com',
    password: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Gx9/27H2KJ5nX6g71sBBq', // bcrypt hash for 'password'
  };

  if (email === user.email) {
    return user;
  } else {
    return null;
  }
};

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Here, you would generate a token or session
    // For example, using NextAuth.js, you might want to create a session manually
    // But typically, NextAuth.js would handle this via its own routes

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
