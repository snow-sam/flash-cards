import { LogOutButton } from '@/components/LogOut';
import { DeckComponent } from '@/components/Deck';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Menu } from 'lucide-react';

async function getDecks() {
  return await prisma.deck.findMany()
}

export default async function Home() {
  const decks = await getDecks()
  const session = await auth()
  const image = session?.user.image
  return (
    <div className="h-[100dvh] bg-neutral-200">
      <nav className="flex text-white justify-between items-center p-4 bg-neutral-900 w-full h-[68px]">
        <LogOutButton/>
        <div className='p-4 border-2 border-[#7D6D6D] bg-[#ECE4E4] grid place-items-center rounded-full w-[54px] h-[54px] py-2 justify-self-center'>
        </div>
        <Menu/>
      </nav>
      <section className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 p-4">
        {decks.map((deck, i) => {
          return <DeckComponent key={i} deck={deck}/>
        })}
      </section>
    </div>
  );
}
