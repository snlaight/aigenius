/* eslint-disable import/prefer-default-export */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import './globals.css';

import CrispProvider from '@/providers/CrispProvider';
import TRPCProvider from '@/providers/trpcProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Genius',
  description: 'AI Platform',
};

const RootLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode,
  modal: React.ReactNode
}) => (
  <ClerkProvider>
    <html lang='en'>
      <TRPCProvider>
        <CrispProvider />
        <body className={inter.className}>
          <Toaster position='top-right' richColors closeButton />
          {modal}
          {children}
        </body>
      </TRPCProvider>
    </html>
  </ClerkProvider>
);

export default RootLayout;
