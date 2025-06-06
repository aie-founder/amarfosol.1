import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingBasket, Leaf, Carrot, Apple } from 'lucide-react';
import Link from 'next/link';
import type { Category } from '@/types';
import Image from 'next/image';

const categories: Category[] = [
  { id: 'vegetables', name: 'Fresh Vegetables', icon: Carrot, imageUrl: 'https://placehold.co/300x200.png', description: 'Farm-fresh, seasonal vegetables.', dataAiHint: 'vegetables basket' },
  { id: 'fruits', name: 'Seasonal Fruits', icon: Apple, imageUrl: 'https://placehold.co/300x200.png', description: 'Sweet and juicy fruits, locally grown.', dataAiHint: 'fruits variety' },
  { id: 'grains', name: 'Grains & Pulses', icon: Leaf, imageUrl: 'https://placehold.co/300x200.png', description: 'Nutritious grains and pulses.', dataAiHint: 'grains sack' },
  { id: 'dairy', name: 'Artisanal Dairy', icon: ShoppingBasket, imageUrl: 'https://placehold.co/300x200.png', description: 'Fresh dairy products from local farms.', dataAiHint: 'dairy products' },
];

export default function CategoryHighlights() {
  return (
    <section id="categories" className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-headline font-bold text-foreground">Explore Our Categories</h2>
        <p className="text-muted-foreground mt-2">Discover a wide variety of products from local farmers.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/products?category=${category.id}`} key={category.id} className="group">
            <Card className="h-full_ hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center p-4">
                {category.imageUrl && (
                  <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                    <Image 
                      src={category.imageUrl} 
                      alt={category.name} 
                      layout="fill" 
                      objectFit="cover" 
                      data-ai-hint={category.dataAiHint || category.name.toLowerCase()}
                    />
                  </div>
                )}
                {category.icon && !category.imageUrl && <category.icon className="w-12 h-12 text-primary mb-2 group-hover:scale-110 transition-transform" />}
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 pt-0 flex-grow">
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Augment Category type for this component
declare module '@/types' {
  export interface Category {
    imageUrl?: string;
    dataAiHint?: string;
  }
}
