'use client'

import { useCardsControl } from "@/hooks/useCardsControl"
import { Card } from "@prisma/client"
import { ArrowLeft } from 'lucide-react';
import { CardsContainer } from '@/components/CardsContainer';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';


const FlashCardsContainer = ({ cards }: { cards: Array<Card> }) => {
    const control = useCardsControl(cards.length)

    return (
        <div className="grid overflow-hidden place-items-center bg-neutral-200 w-full h-[100dvh] relative">
            <div className='w-full absolute top-0 p-4 grid-cols-[min-content_auto]'>
                <Link href='/' className='font-bold bg-white shadow-lg w-12 h-12 grid place-items-center rounded-full'>
                    <ArrowLeft />
                </Link>
            </div>
            <Progress className='w-[200px] h-2 rounded-none absolute top-[36px] md:w-[360px]' value={Math.floor(control.totalAnswers)} />
            <CardsContainer cards={cards} cardsControl={control}/>
        </div>
    )
}



export default FlashCardsContainer