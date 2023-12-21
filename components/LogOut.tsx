'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function LogOutButton() {
  return <LogOut onClick={() => signOut()} className="cursor-pointer" />;
}
