import FlashCardsContainer from '@/components/FlashCardsContainer';
import { prisma } from '@/lib/prisma';


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


