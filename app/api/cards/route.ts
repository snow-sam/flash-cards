import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const POST = async (req: Request, res: NextApiResponse) => {
    const {question, answer, deckId} = await req.json()
    await prisma.card.create({
        data: {
            question,
            answer,
            deckId
        }
    })
    return Response.json({question, answer, deckId})
}

export { POST }