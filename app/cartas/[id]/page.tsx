import { auth } from '@/auth';
import FlashCardsContainer from '@/components/FlashCardsContainer';
import { prisma } from '@/lib/prisma';
import axios from 'axios'


async function getCards(deckId: string) {
  const session = await auth()
  console.log(session?.user.id, deckId)
  fetch('http://localhost:3000/api/usersOnDecks', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: session?.user.id,
      deckId: deckId,
      lastViewAt: new Date(),
    }),
  });

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


