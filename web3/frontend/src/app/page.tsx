'use client';

import { Navbar, Hero } from '@/components';
import { useEventListeners } from '@/hooks';

export default function HomePage() {
  useEventListeners();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
    </main>
  );
}