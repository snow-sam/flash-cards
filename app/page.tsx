import { LogOutButton } from '@/components/LogOut';
import { DeckComponent } from '@/components/Deck';
import { Uploader } from '@/components/Uploader';
import { prisma } from '@/lib/prisma';

async function getDecks() {
  return await prisma.deck.findMany()
}

export default async function Home() {
  const decks = await getDecks()
  
  return (
    <div className="h-[100dvh] bg-[#f9f9f8]">
      <nav className="flex text-white items-center p-4 justify-end bg-neutral-900 w-full h-[68px]">
        <LogOutButton/>
      </nav>
      <section className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 py-4">
        {decks.map((deck, i) => {
          return <DeckComponent key={i} deck={deck}/>
        })}
      </section>
      <Uploader/>
    </div>
  );
}
