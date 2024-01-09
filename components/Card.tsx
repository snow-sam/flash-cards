'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@prisma/client';
import { motion } from 'framer-motion';
import TinderCard from 'react-tinder-card';
import { toast } from 'react-hot-toast';


type CardProps = {
  card: Card,
}

export const CardComponent = ({ card }: CardProps) => {
  
  const [isDraggin, setIsDraggin] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating && !isDraggin) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  const handleCardLeftScreen = (pos: string) => {
    setIsDraggin(false);
    const conf = {
      id: Math.random().toString(),
      duration: 1000,
      style: { backgroundColor: '#121212', color: 'white' },
    };

    if (pos === 'left') toast.error('Que pena!', conf);
    if (pos === 'right') toast.success('Boa!', conf);
  };

  return (
    <TinderCard
      className="absolute"
      preventSwipe={['up', 'down']}
      swipeRequirementType="position"
      swipeThreshold = {20}
      onSwipe={() => setIsDraggin(true)}
      onCardLeftScreen={handleCardLeftScreen}
      onSwipeRequirementUnfulfilled={() => setIsDraggin(false)}
      onSwipeRequirementFulfilled={() => setIsDraggin(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-[260px] h-[360px] rounded-xl shadow-lg bg-neutral-800 shadow-black/30"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        <motion.div
          className="w-[100%] h-[100%] transition-transform ease-out"
          style={{ transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.3, animationDirection: 'normal' }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="pressable absolute w-[100%] h-[100%] bg-neutral-800 text-white rounded-xl p-6"
          >
            <span>{card.question}</span>
            {card.imageSvg && <Image
              className="absolute bottom-6 right-6 w-8"
              src={card.imageSvg}
              alt="logotipo da carta"
            />}

          </div>

          <div
            style={{ backfaceVisibility: 'hidden', transform: `rotateY(180deg)` }}
            className="pressable absolute w-[100%] h-[100%] bg-neutral-800 text-white rounded-xl p-6"
          >
            <span>{card.answer}</span>
            {card.imageSvg && <Image
              className="absolute bottom-6 right-6 w-8"
              src={card.imageSvg}
              alt="logotipo da carta"
            />}

          </div>
        </motion.div>
      </motion.div>
    </TinderCard>
  );
};