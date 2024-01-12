import { auth } from '@/auth';
import FlashCardsContainer from '@/components/FlashCardsContainer';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers'


async function getCards(deckId: string) {
  const headersData = headers()
  const host = headersData.get('host') ?? ''
  const protocol = headersData.get('x-forwarded-proto') ?? host.startsWith('localhost') ? 'http' : 'https' 
  const apiBase = `${protocol}://${host}`

  const session = await auth()
  fetch(`${apiBase}/api/usersOnDecks`, {
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


