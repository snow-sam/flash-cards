import { Deck } from '@prisma/client';
import Link from 'next/link';


type DeckProps = {
  deck: Deck
}

export function DeckComponent({ deck }: DeckProps) {

  return (
    <Link href={`/cartas/${deck.id}`}
      className="cursor-pointer flex flex-col hover:opacity-70 w-full"
    >
      <div className='bg-no-repeat bg-center bg-contain w-full h-[68px]' style={{ backgroundImage: `url(${deck.imageSvg})` }}></div>
      <div className="bg-neutral-800 pl-4 py-3 text-white">{deck.name}</div>
    </Link>
  );
}
