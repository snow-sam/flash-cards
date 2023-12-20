"use client"
import { LogOut } from 'lucide-react';
import AWS from '@/public/aws.svg';
import { Deck } from '@/components/Deck';
import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <div className="h-[100dvh] bg-[#f9f9f8]">
      <nav className="flex text-white items-center p-4 justify-end bg-neutral-900 w-full h-[68px]">
        <LogOut className='cursor-pointer' onClick={signOut}/>
      </nav>
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 py-4">
        <Deck title="Amazon Web Services" imgSrc={AWS} />
      </section>
    </div>
  );
}
