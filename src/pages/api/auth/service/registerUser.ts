import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../db/index';

// POST /api/auth/service/registerUser
// Check if rest api is ok
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.body;
  user.role = 1;

  const wasCreated = await prisma.user.create({
    data: user,
  });
  return res.status(200).json({ data: true });
}
