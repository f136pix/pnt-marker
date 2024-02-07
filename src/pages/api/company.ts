// /api/user

import axios from "axios";

interface QueryParameters {
    name?: string;
    id?: number;
}

import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../db';
import {NextParsedUrlQuery} from 'next/dist/server/request-meta';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method, query} = req;
    switch (method) {
        case 'GET':
            // Handle GET request
            handleGetRequest(res, query);
            break;

        case 'POST':
            // Handle POST request
            handlePostRequest(req, res, query);
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
    if (query.id) {
        const id = Number(query.id);
        const company = await prisma.company.findUnique({
            where: {
               id : id,
            },
            include: {
                users: true
            }
        });
        if (company) {
            res.status(200).json({ data: { company } });
        }
        res.status(404).json({ err: 'company not found', data: {} });
    }
    res
        .status(404)
        .json({ err: 'query must be either by id or name', data: {} });
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse, query: QueryParameters) {
    const data = await axios.get(`http://localhost:3000/api/user?email=${req.body.userEmail}`);
    const user = data.data.data.user;
    if (user.companyId !== null) {
        return res.status(403).json({error: "user already assigned to a company"});
    }
    const company = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };

    // transactional method
        const createdCompany = await prisma.company.create({
            data: company
        });

        const updatedUser = await prisma.user.update({
            where: {
                id : user.id
            },
                data: {
                    role: 3,
                    companyId: createdCompany.id
                }
        });
        if(createdCompany && updatedUser) {
            res.status(200).json({message: 'ok'});
        }
    res.status(500).json({err: 'there was a error'});
}

function handleDeleteRequest(res: NextApiResponse, query: QueryParameters) {
    // Your logic for handling DELETE request
    res.status(200).json({method: 'DELETE', query});
}
