import { CardComponent } from '@/components/Card';
import { prisma } from '@/lib/prisma';

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
    <div className="grid overflow-hidden place-items-center w-full h-[100dvh] relative">
      {cards.map((card, i) => (
        <CardComponent
          key={i}
          card={card}
        />
      ))}
    </div>
  );
}


