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
      handlePostRequest(res, query);
      break;

    case 'DELETE':
      // Handle DELETE request
      handleDeleteRequest(res, query);
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
      res.status(200).json({ data: { users } });
    }
    res.status(404).json({ err: 'wasnt found any user', data: {} });
  }

  res
    .status(404)
    .json({ err: 'query must be either by id or email', data: {} });
}

function handlePostRequest(res: NextApiResponse, query: QueryParameters) {
  // Your logic for handling POST request
  res.status(200).json({ method: 'POST', query });
}

function handleDeleteRequest(res: NextApiResponse, query: QueryParameters) {
  // Your logic for handling DELETE request
  res.status(200).json({ method: 'DELETE', query });
}
