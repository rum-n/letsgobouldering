import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

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
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { name, country, address, description, website, image } = req.body as GymRequestBody;

  if (!name || !country || !address || !image) {
    let missingFields = [];
    if (!name) missingFields.push('name');
    if (!country) missingFields.push('country');
    if (!address) missingFields.push('address');
    if (!image) missingFields.push('image');
    return res.status(400).json({ message: `${missingFields.join(', ')} required` });
  }

  try {
    const existingGym = await prisma.gym.findUnique({
      where: {
        name_address: {
          name,
          address
        }
      },
    });

    if (existingGym) {
      return res.status(409).json({ message: 'Gym with the same name and address already exists' });
    }

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
    res.status(500).json({ message: 'An error occurred while adding the gym', error });
  }
}
