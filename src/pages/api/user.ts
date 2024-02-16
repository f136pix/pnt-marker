// /api/user

interface QueryParameters {
  email?: string;
  id?: number;
  noCompany? :boolean;
}

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../db';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  switch (method) {
    case 'GET':
      // Handle GET request
      handleGetRequest(res, query);
      break;

    case 'POST':
      // Handle POST request
      handlePostRequest(req, res);
      break;

    case 'DELETE':
      // Handle DELETE request
      handleDeleteRequest(req, res);
      break;

    default:
      res.status(405).end(); // Method Not Allowed
  }
}

async function handleGetRequest(res: NextApiResponse, query: QueryParameters) {
  if (query.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: query.email,
      },
    });
    if (user) {
      res.status(200).json({ data: { user } });
    }
    res.status(404).json({ err: 'user not found', data: {} });
  }
  if (query.id) {
    // retrieve by id
  }
  // retrieve only users without company
  if (query.noCompany) {
    const users = await prisma.user.findMany({
      where: {
        companyId: null,
      },
    });
    if (users) {
      res.status(200).json({ data: { users }, status: 200 });
    }
    res.status(404).json({ err: 'wasnt found any user', data: {} });
  }

  res
    .status(404)
    .json({ err: 'query must be either by id or email', data: {} });
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id;
  const user = req.body.user;

await prisma.user.update({
      where: {
        id: id
      },
    data : user
  }).then((user) =>   res.status(200).json({ message: 'user updated', data: user, status: 200 }))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    }
    );
}

function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id;

  res.status(200).json({ method: 'DELETE'});
}
