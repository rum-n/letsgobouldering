import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

interface GymRequestBody {
  name: string;
  address: string;
  country: string;
  description?: string;
  website?: string;
  image: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get session to check if user is authenticated
  const session = await getSession({ req });
  
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { name, country, address, description, website, image } = req.body as GymRequestBody;

  // Validate input
  if (!name || !country) {
    return res.status(400).json({ message: 'Name, city, and country are required' });
  }

  try {
    // Create a new gym in the database using Prisma
    const newGym = await prisma.gym.create({
      data: {
        name,
        country,
        address,
        description,
        website,
        image,
      },
    });

    res.status(201).json(newGym);
  } catch (error) {
    console.error('Error adding gym:', error);
    res.status(500).json({ message: 'An error occurred while adding the gym' });
  }
}
