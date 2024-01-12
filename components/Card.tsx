'use client';
import Image from 'next/image';
import { Card as CardModel } from '@prisma/client';
import { motion } from 'framer-motion';
import { useState } from 'react'
import TinderCard from 'react-tinder-card';
import type { useCardsControlData } from '@/hooks/useCardsControl';

type CardProps = {
  index: number
  card: CardModel,
  cardsControl: useCardsControlData,
}

export const Card = ({ index, card, cardsControl }: CardProps) => {

  const [isFlipped, setIsFlipped] = useState(false)
  const {childRefs, swiped, onCardLeftScreen} = cardsControl

  return (
    <TinderCard
      ref={childRefs[index]}
      className="absolute"
      preventSwipe={['up', 'down']}
      swipeRequirementType="position"
      swipeThreshold={20}
      onSwipe={(dir) => swiped(dir, index)}
      onCardLeftScreen={(dir) => onCardLeftScreen(dir, index)}
    >
      <motion.div
        whileHover={{ rotate: 1.05 }}
        className="w-[260px] h-[360px] rounded-xl shadow-sm bg-neutral-800 shadow-black/30"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-[100%] h-[100%] transition-transform ease-out"
          style={{ transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.3, animationDirection: 'normal' }}
        >
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="pressable absolute w-[100%] h-[100%] bg-neutral-800 text-white rounded-xl p-6"
          >
            <span>{card.question}</span>
            {card.imageSvg && <Image
              className="absolute bottom-6 right-6 w-8"
              src={card.imageSvg}
              width={8}
              height={8}
              alt="logotipo da carta"
            />}

          </div>

          <div
            style={{ backfaceVisibility: 'hidden', transform: `rotateY(180deg)` }}
            className="pressable absolute w-[100%] h-[100%] bg-neutral-800 text-white rounded-xl p-6"
          >
            <span>{card.answer}</span>
            {card.imageSvg && <Image
              className="absolute bottom-6 left-6 w-8"
              width={8}
              height={8}
              src={card.imageSvg}
              alt="logotipo da carta"
            />}

          </div>
        </motion.div>
      </motion.div>
    </TinderCard>
  );
};