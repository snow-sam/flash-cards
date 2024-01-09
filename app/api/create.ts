import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    console.log(req)
    const {question, answer, deckId } = req.body;
    await prisma.card.create({
        data: {
            question,
            answer,
            deckId
        }
    })

    return res.status(201).json({});    
}