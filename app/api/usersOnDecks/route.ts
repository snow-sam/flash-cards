import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const PATCH = async (req: Request, res: NextApiResponse) => {
    const {userId, deckId, ...patchItems} = await req.json()
    if(!userId || !deckId){
        return res.json({erro: 'É necessário apresentar usuario e deck'})
    }

    try {
        const x = await prisma.userOnDecks.update({
            where: {
                userId_deckId: {userId, deckId}
            },
            data: patchItems
        })
        return Response.json({ messgae: 'Operação bem-sucedida', data: patchItems });
    } catch (error){
        return Response.json(JSON.stringify(error));
    }
}

const GET = async (req: Request, res: NextApiResponse) => {
    const items = await prisma.userOnDecks.findMany()
    return Response.json({items})
}

export { PATCH, GET }