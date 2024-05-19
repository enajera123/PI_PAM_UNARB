import { Header } from '@/components/NavBar/Header';
import React from 'react';

export default function UserRegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}