import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../../../db/index'

// POST /api/auth/service/userExists
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if(user) {
        return res.status(200).json({value: true})
    }
    return res.status(204).json({})


}