'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type PropTypeFlipCard = {
  frontContent: string,
  backContent: string,
  icone: any,
  isDraggin: boolean
}

export const FlipCard = ({ frontContent, backContent, icone, isDraggin }: PropTypeFlipCard) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating && !isDraggin) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }
  return (
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
          <span>{frontContent}</span>
          <Image
            className="absolute bottom-6 right-6 w-8"
            src={icone}
            alt="Logotipo da AWS"
          />
        </div>

        <div
          style={{ backfaceVisibility: 'hidden', transform: `rotateY(180deg)` }}
          className="pressable absolute w-[100%] h-[100%] bg-neutral-800 text-white rounded-xl p-6"
        >
          <span>{backContent}</span>
          <Image
            className="absolute bottom-6 right-6 w-8"
            src={icone}
            alt="Logotipo da AWS"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
