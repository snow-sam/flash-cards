import { LogOutButton } from '@/components/LogOut';
import { Baralho } from '@/components/Baralho';
import { prisma } from '@/lib/prima';
import { useSession } from "next-auth/react"

async function getBaralhos() {
  return await prisma.baralho.findMany()
}

export default async function Home() {
  const { data: session } = useSession()
  const baralhos = await getBaralhos()

  return (
    <div className="h-[100dvh] bg-[#f9f9f8]">
      <nav className="flex text-white items-center p-4 justify-end bg-neutral-900 w-full h-[68px]">
        <LogOutButton/>
      </nav>
      {session?.user?.email}
      <section className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 py-4">
        {baralhos.map((baralho, i) => {
          return <Baralho key={i} baralho={baralho}/>
        })}
      </section>
    </div>
  );
}
