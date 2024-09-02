import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const gyms = await prisma.gym.findMany();
      res.status(200).json(gyms);
    } catch (error) {
      console.error("Error fetching gyms:", error); // Log the complete error
      res.status(500).json({ message: 'Error fetching gyms', error: (error as Error).message }); // Send error message
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
