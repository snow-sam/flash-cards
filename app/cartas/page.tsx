'use client';

import { useState } from 'react';
import AWS from '@/public/aws2.svg';
import { FlipCard } from '@/components/FlipCard';
import TinderCard from 'react-tinder-card';
import { Toaster, toast } from 'react-hot-toast';

const cartas = [
  { f: 'Você vai largar o projeto?', b: 'Em algum momento.' },
  { f: 'Previsão de entrega?', b: 'Não temos.' },
  { f: 'Isso da mais trabalho do que você pensou?', b: 'Sim, claramente sim.' },
];

export default function FlashCardSession() {
  const [isDraggin, setIsDraggin] = useState(false);

  const handleCardLeftScreen = (pos) => {
    setIsDraggin(false);
    const conf = {
      id: Math.random(),
      duration: 1000,
      style: { backgroundColor: '#121212', color: 'white' },
    };

    if (pos === 'left') toast.error('Que pena!', conf);
    if (pos === 'right') toast.success('Boa!', conf);
  };

  return (
    <div className="grid overflow-hidden place-items-center w-full h-[100dvh] relative">
      {cartas.map((carta, i) => {
        return (
          <TinderCard
            key={i}
            className="absolute"
            preventSwipe={['up', 'down']}
            swipeRequirementType="position"
            onSwipe={() => setIsDraggin(true)}
            onCardLeftScreen={handleCardLeftScreen}
            onSwipeRequirementUnfulfilled={() => setIsDraggin(false)}
            onSwipeRequirementFulfilled={() => setIsDraggin(false)}
          >
            <FlipCard
              frontContent={carta.f}
              backContent={carta.b}
              icone={AWS}
              isDraggin={isDraggin}
            />
          </TinderCard>
        );
      })}
      <Toaster />
    </div>
  );
}
