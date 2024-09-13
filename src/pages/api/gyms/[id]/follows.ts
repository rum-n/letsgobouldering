import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (!session || !session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id } = req.query; // Gym ID from the URL
        const userId = (session.user as { id: number }).id; // User ID from the session

        try {
            // Check if the user is already following the gym
            const existingFollow = await prisma.follow.findFirst({
                where: {
                    userId: parseInt(userId.toString()),
                    gymId: parseInt(id?.toString() ?? ''),
                },
            });

            if (existingFollow) {
                return res.status(400).json({ message: 'You are already following this gym' });
            }

            // Create a new follow entry
            await prisma.follow.create({
                data: {
                    userId: parseInt(userId.toString()),
                    gymId: parseInt(id as string),
                },
            });

            res.status(201).json({ message: 'Followed gym successfully' });
        } catch (error) {
            console.error('Error following gym:', error);
            res.status(500).json({ message: 'Error following gym', error: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
