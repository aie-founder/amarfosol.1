import HeroSection from '@/components/home/HeroSection';
import CategoryHighlights from '@/components/home/CategoryHighlights';
import Testimonials from '@/components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />

      <section id="video-promo" className="text-center">
        <h2 className="text-3xl font-headline font-bold mb-6 text-foreground">Watch Our Story</h2>
        <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video bg-muted flex items-center justify-center">
              {/* Placeholder for video */}
              <div className="text-center p-8">
                <PlayCircle className="w-24 h-24 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Our mission, vision, and how we connect communities.</p>
                <Button variant="default" size="lg" disabled>
                  Video Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <CategoryHighlights />
      <Testimonials />

       <section id="cta" className="text-center py-12 bg-primary/10 rounded-lg">
        <h2 className="text-3xl font-headline font-bold mb-4 text-primary">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Join Amarfosol.com today and be part of a sustainable agricultural future. Whether you're a farmer, consumer, or volunteer, there's a place for you.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/products">Shop Fresh Produce</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/farmers/join">Become a Seller</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
