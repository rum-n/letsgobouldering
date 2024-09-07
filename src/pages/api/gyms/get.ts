import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { search } = req.query;

    try {
      let gyms;
      if (search) {
        gyms = await prisma.gym.findMany({
          where: {
            OR: [
              { name: { contains: search as string, mode: 'insensitive' } },
              { country: { contains: search as string, mode: 'insensitive' } },
              { address: { contains: search as string, mode: 'insensitive' } },
            ],
          },
        });
      } else {
        gyms = await prisma.gym.findMany();
      }
      res.status(200).json(gyms);
    } catch (error) {
      console.error("Error fetching gyms:", error);
      res.status(500).json({
        message: 'Error fetching gyms',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
