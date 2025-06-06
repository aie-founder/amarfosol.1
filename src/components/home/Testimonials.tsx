import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Amarfosol.com has transformed how I sell my produce. Direct access to consumers means better prices and less waste. The platform is user-friendly and the support is excellent!",
    authorName: 'Amina Khatun',
    authorRole: 'Farmer, Manikganj',
    authorImageUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'smiling farmer'
  },
  {
    id: '2',
    quote: "I love knowing where my food comes from! The quality of fruits and vegetables is outstanding, and I feel good supporting local farmers. Delivery is always on time.",
    authorName: 'Rajib Ahmed',
    authorRole: 'Consumer, Dhaka',
    authorImageUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'happy customer'
  },
  {
    id: '3',
    quote: "Volunteering through Amarfosol.com was a rewarding experience. I learned so much about farming and contributed to a meaningful cause. Highly recommend it!",
    authorName: 'Sonia Akter',
    authorRole: 'Volunteer, Gazipur',
    authorImageUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'young volunteer'
  },
];

// Augment Testimonial type for this component
declare module '@/types' {
  export interface Testimonial {
    dataAiHint?: string;
  }
}

export default function Testimonials() {
  return (
    <section className="py-12 bg-secondary/50 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-headline font-bold text-foreground">Voices of Our Community</h2>
          <p className="text-muted-foreground mt-2">See what farmers, consumers, and volunteers are saying about Amarfosol.com.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.authorImageUrl} alt={testimonial.authorName} data-ai-hint={testimonial.dataAiHint || "person"} />
                    <AvatarFallback>{testimonial.authorName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold font-headline text-foreground">{testimonial.authorName}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.authorRole}</p>
                  </div>
                </div>
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter>
                 {/* Can add date or other info here if needed */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
