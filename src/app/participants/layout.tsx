import { Header } from '@/components/NavBar/Header';
import React from 'react';

export default function ParticipantsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}