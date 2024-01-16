import { Deck } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';


type DeckProps = {
  deck: Deck
}

export function DeckComponent({ deck }: DeckProps) {

  return (
    <Link href={`/cartas/${deck.id}`}
      className="cursor-pointer grid grid-rows-[fit-content(100%)_auto_fit-content(100%)] hover:opacity-70 bg-[#1E232C] py-4 rounded-xl shadow-xl"
    >
      <div className='w-full flex justify-end items-center text-white px-4'>
        <MoreHorizontal />
      </div>
      <div className='p-4 mb-4 border-2 border-[#7D6D6D] bg-[#ECE4E4] grid place-items-center rounded-full justify-self-center'>
        <Image alt={deck.name} src={deck.imageSvg || ''} width={30} height={30} />
      </div>
      <div className="w-full text-center text-white">{deck.name}</div>
    </Link>
  );
}
