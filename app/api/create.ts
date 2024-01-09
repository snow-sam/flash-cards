import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    console.log(req)
    const {pergunta, resposta, baralhoId } = req.body;
    await prisma.carta.create({
        data: {
            pergunta,
            resposta,
            baralhoId
        }
    })

    return res.status(201).json({});    
}