import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/30 via-background to-background rounded-lg shadow-lg overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1200x600.png"
          alt="Lush green farm"
          data-ai-hint="bangladesh farm"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-foreground">
          Fresh. Local. Connected.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Amarfosol.com bridges the gap between farmers and consumers, fostering a community built on fresh produce, fair prices, and shared growth.
        </p>
        <div className="space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <Button size="lg" asChild className="w-full md:w-auto">
            <Link href="/products">Explore Products</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full md:w-auto">
            <Link href="/#categories">Discover Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
