import { auth } from '@/auth';
import FlashCardsContainer from '@/components/FlashCardsContainer';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers'


async function getCards(deckId: string) {
  return await prisma.card.findMany({
    where: {
      deckId
    }
  })
}

export default async function FlashCardsPage({ params }: { params: { id: string } }) {

  const cards = await getCards(params.id)

  return (
    <FlashCardsContainer cards={cards} />
  );
}


