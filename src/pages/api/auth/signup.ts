import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
