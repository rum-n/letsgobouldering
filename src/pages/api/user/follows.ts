import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const session = await getSession({ req });

        if (!session || !session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = (session.user as { id: number }).id.toString();

        try {
            const followedGyms = await prisma.follow.findMany({
                where: { userId: parseInt(userId) },
                include: {
                    gym: true,
                },
            });

            const gyms = followedGyms.map((follow) => follow.gym);

            res.status(200).json(gyms);
        } catch (error) {
            console.error('Error fetching followed gyms:', error);
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: 'Error fetching followed gyms', error: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
