import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Flash Cards',
  description: 'Desenvolvido por Samuel Souza',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <body className={inter.className}>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
