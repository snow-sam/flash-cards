import { Undo2, X, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from './Card'
import { Card as CardModel } from '@prisma/client'
import { useCardsControlData } from '@/hooks/useCardsControl';

type CardsContaineProps = {
    cards: Array<CardModel>
    cardsControl: useCardsControlData
}

export const CardsContainer = ({ cards, cardsControl }: CardsContaineProps) => {
    return (
            <div className='flex flex-col'>
                <div className='relative w-full h-[420px] flex justify-center items-center'>
                    {cards.map((card, i) => (
                        <Card key={card.id} index={i} cardsControl={cardsControl} card={card}/>
                    ))}
                </div>

                <motion.div className='self-center flex gap-4'>
                    <motion.button
                        whileHover={{ y: -8 }}
                        whileTap={{ y: -8 }}
                        onClick={() => cardsControl.swipe('left')}
                        className='font-bold text-red-500 bg-white shadow-lg w-12 h-12 grid place-items-center rounded-full'>
                        <X strokeWidth={2} />
                    </motion.button>
                    <motion.button
                        whileHover={{ y: -8 }}
                        onClick={() => cardsControl.goBack()}
                        className='font-bold bg-white shadow-lg w-12 h-12 grid place-items-center rounded-full'>
                        <Undo2 strokeWidth={2} />
                    </motion.button>
                    <motion.button
                        whileHover={{ y: -8 }}
                        onClick={() => cardsControl.swipe('right')}
                        className='font-bold bg-white shadow-lg w-12 h-12 grid place-items-center rounded-full'>
                        <Heart fill="#42f587" stroke='#42f587' strokeWidth={2} />
                    </motion.button>
                </motion.div>
            </div>
    )
}