import { Carta } from '@/components/Carta';
import { Toaster } from 'react-hot-toast'
import { prisma } from '@/lib/prima';

async function getCartas(baralhoId: string) {

  return await prisma.carta.findMany({
    where: {
      baralhoId
    }
  })
}

export default async function FlashCardSession({ params }: { params: { id: string } }) {
  
  const cartas = await getCartas(params.id)

  return (
    <div className="grid overflow-hidden place-items-center w-full h-[100dvh] relative">
      {cartas.map((carta, i) => (
        <Carta
          key={i}
          carta={carta}
        />
      ))}
      <Toaster />
    </div>
  );
}

