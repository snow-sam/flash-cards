'use client'
import { Undo2, X, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import React, { useMemo, useState, useRef } from 'react'
import { CardComponent } from './Card'
import { toast } from 'react-hot-toast'
import { Card } from '@prisma/client'


export const CardsControl = ({ cards }: { cards: Array<Card> }) => {
    const [currentIndex, setCurrentIndex] = useState(cards.length - 1)
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo<Array<any>>(() =>
        Array(cards.length)
            .fill(0)
            .map((i) => React.createRef()),
        [cards.length]
    )



    const handleCardLeftScreen = (pos: string, index: number) => {
        const conf = {
            id: Math.random().toString(),
            duration: 1000,
            style: { backgroundColor: '#121212', color: 'white' },
        };

        if (pos === 'left') toast.error('Que pena!', conf);
        if (pos === 'right') toast.success('Boa!', conf);
        outOfFrame(index)
    };


    const updateCurrentIndex = (val: any) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < cards.length - 1
    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (index: number) => {
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (indice: number) => {
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= indice && childRefs[indice].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (direcao: string) => {
        if (canSwipe && currentIndex < cards.length) {
            await childRefs[currentIndex].current.swipe(direcao) // Swipe the card!
        }
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }

    return (
        <div className='flex flex-col'>
            <div className='relative w-full h-[420px] flex justify-center items-center'>
                {cards.map((card, i) => (
                    <CardComponent
                        key={i}
                        index={i}
                        cardReference={childRefs[i]}
                        card={card}
                        handleCardLeftScreen={handleCardLeftScreen}
                        swiped={swiped}
                    />
                ))}
            </div>

            <motion.div className='self-center flex gap-4'>
                <motion.button
                    whileHover={{ y: -8 }}
                    whileTap={{ y: -8 }}
                    onClick={() => swipe('left')}
                    className='font-bold text-red-500 bg-white shadow-lg w-12 h-12 grid place-items-center rounded-full'>
                    <X strokeWidth={2} />
                </motion.button>
                <motion.button
                    whileHover={{ y: -8 }}
                    onClick={() => goBack()}
                    className='font-bold bg-white shadow-lg w-12 h-12 grid place-items-center rounded-full'>
                    <Undo2 strokeWidth={2} />
                </motion.button>
                <motion.button
                    whileHover={{ y: -8 }}
                    onClick={() => swipe('right')}
                    className='font-bold bg-white shadow-lg w-12 h-12 grid place-items-center rounded-full'>
                    <Heart fill="#42f587" stroke='#42f587' strokeWidth={2} />
                </motion.button>
            </motion.div>
        </div>
    )
}