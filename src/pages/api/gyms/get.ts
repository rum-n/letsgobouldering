import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page = 1, limit = 20, search = '' } = req.query;

    // Ensure page and limit are integers
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    try {
      const gyms = await prisma.gym.findMany({
        where: {
          OR: [
            { name: { contains: search as string, mode: 'insensitive' } },
            { country: { contains: search as string, mode: 'insensitive' } },
            { address: { contains: search as string, mode: 'insensitive' } },
          ]
        },
        skip: (pageNum - 1) * limitNum, // Skip records based on current page
        take: limitNum, // Take a limited number of records per page
        orderBy: {
          name: 'asc', // Example of sorting gyms by name, adjust as needed
        },
      });

      // Get the total count of gyms that match the search criteria
      const totalGyms = await prisma.gym.count({
        where: {
          OR: [
            { name: { contains: search as string, mode: 'insensitive' } },
            { country: { contains: search as string, mode: 'insensitive' } },
            { address: { contains: search as string, mode: 'insensitive' } },
          ]
        },
      });

      // Calculate total number of pages
      const totalPages = Math.ceil(totalGyms / limitNum);

      res.status(200).json({
        gyms,
        page: pageNum,
        totalPages,
        totalGyms,
      });

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
