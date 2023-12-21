import { Baralho } from '@prisma/client';
import Link from 'next/link';


type BaralhoProps = {
  baralho: Baralho
}

export function Baralho({ baralho }: BaralhoProps) {

  return (
    <Link href={`/cartas/${baralho.id}`}
      className="cursor-pointer flex flex-col hover:opacity-70 w-full"
    >
      <div className='bg-no-repeat bg-center bg-contain w-full h-[68px]' style={{ backgroundImage: `url(${baralho.imageSvg})` }}></div>
      <div className="bg-neutral-800 pl-4 py-3 text-white">{baralho.nome}</div>
    </Link>
  );
}
