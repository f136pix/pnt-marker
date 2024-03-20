// /api/user

import {toNumber} from "@vue/shared";

interface QueryParameters {
    id?: number;
    userId?: number;
}

import prisma from '../../../db';
import {NextApiRequest, NextApiResponse} from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method, query} = req;
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
            // handleDeleteRequest(req, res);
            break;

        default:
            res.status(405).end(); // Method Not Allowed
    }
}

const handleGetRequest = async (res: NextApiResponse, query: QueryParameters) => {
    if (query.userId) {
        const times = await prisma.time.findUnique({
            where: {
                userId: toNumber(query.userId)
            },
        });
        //console.log(query.userId);
        //console.log(times);
        if (times) {
            res.status(200).json({data: {times}, status: 200});
        }
        if (times == null) {
            res.status(404).json({err: 'no time registered for this user', data: {}});
        }
        res.status(405).json({err: 'internal error', data: {}});
    }
};
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {userId, entryTime, exitTime, launchTime} = req.body;
    const time = await prisma.time.create({
        data: {
            entryTime,
            exitTime,
            launchTime,
            userId: userId,
        },
    });
    res.status(201).json({data: {time}, status: 201});
};