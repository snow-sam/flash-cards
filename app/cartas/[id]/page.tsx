import { CardsControl } from '@/components/cards-control';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';


async function getCards(deckId: string) {

  return await prisma.card.findMany({
    where: {
      deckId
    }
  })
}

export default async function FlashCardSession({ params }: { params: { id: string } }) {

  const cards = await getCards(params.id)

  return (
    <div className="grid overflow-hidden place-items-center bg-neutral-200 w-full h-[100dvh] relative">
      <Link href='/' className='absolute top-4 left-4 font-bold bg-white shadow-lg w-12 h-12 grid place-items-center rounded-full'>
        <ArrowLeft/>
      </Link>
      <CardsControl cards={cards}/>
    </div>
  );
}


