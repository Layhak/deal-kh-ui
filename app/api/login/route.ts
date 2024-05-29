import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Simulate successful login (no need to validate credentials here)
  try {
    console.log('Received login data:', req.body);
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}
