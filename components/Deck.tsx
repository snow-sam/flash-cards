'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Deck({ title, imgSrc }) {
  const { push } = useRouter();

  return (
    <div
      onClick={() => push('/cartas')}
      className="cursor-pointer flex flex-col hover:opacity-70 w-full"
    >
      <div className="w-full h-[100px] flex justify-center">
        <Image src={imgSrc} alt="opcao" height={48} />
      </div>
      <div className="bg-neutral-800 pl-4 py-3 text-white">{title}</div>
    </div>
  );
}
