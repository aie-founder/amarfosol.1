import PageHeader from '@/components/shared/PageHeader';
import type { Product } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, CalendarDays, ShoppingCart, Tag, Info, User, Leaf, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data - in a real app, this would be fetched based on params.id
const mockProductsData: { [id: string]: Product } = {
  '1': { id: '1', name: 'Fresh Spinach', category: 'Vegetables', price: 2.50, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'spinach leaves', farmerId: 'f1', farmerName: 'Abdul Karim', location: 'Manikganj', rating: 4.5, harvestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: 'Crisp, organic spinach, hand-picked from Abdul Karim\'s farm in Manikganj. Perfect for salads, smoothies, or light cooking. Grown without any harmful pesticides or chemicals, ensuring you get the freshest and healthiest greens.' },
  '2': { id: '2', name: 'Ripe Mangoes ( सीजनल )', category: 'Fruits', price: 5.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'mangoes fruit', farmerId: 'f2', farmerName: 'Fatima Begum', location: 'Rajshahi', rating: 5, harvestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), description: 'Sweet and juicy seasonal mangoes from Fatima Begum\'s renowned orchards in Rajshahi. These mangoes are known for their exceptional flavor and aroma. Limited stock, available only during the peak season.' },
  '3': { id: '3', name: 'Brown Rice', category: 'Grains', price: 3.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'rice grains', farmerId: 'f1', farmerName: 'Abdul Karim', location: 'Dinajpur', rating: 4, harvestDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), description: 'Nutritious whole grain brown rice from Dinajpur, cultivated by Abdul Karim. This rice is unpolished, retaining all its natural bran and germ, making it rich in fiber and essential nutrients. Ideal for a healthy diet.' },
};

// Augment Product type
declare module '@/types' {
  export interface Product {
    dataAiHint?: string;
  }
}


function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProductsData[params.id];

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={product.dataAiHint || product.name.toLowerCase()}
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <Badge variant="secondary" className="capitalize w-fit mb-2">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-accent fill-accent mr-1" />
                <span className="text-lg font-semibold text-foreground">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground ml-1">({/* e.g. 25 */} reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-5"/>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-5 h-5 mr-1 text-primary" />
                <span>{product.location}</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-primary mb-6 flex items-center">
              <Tag className="w-7 h-7 mr-2 text-primary/80" /> ${product.price.toFixed(2)}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center"><Info className="w-5 h-5 mr-2 text-primary"/>Description</h3>
              <p className="text-foreground/80 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-primary"/>
                <div>
                  <p className="font-semibold text-foreground">Harvest Date</p>
                  <p className="text-muted-foreground">{formatDate(product.harvestDate)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary"/>
                 <div>
                  <p className="font-semibold text-foreground">Farmer</p>
                  <Link href={`/farmers/${product.farmerId}`} className="text-primary hover:underline">
                    {product.farmerName}
                  </Link>
                </div>
              </div>
               <div className="flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-primary"/>
                 <div>
                  <p className="font-semibold text-foreground">Category</p>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Truck className="w-5 h-5 mr-2 text-primary"/>
                 <div>
                  <p className="font-semibold text-foreground">Delivery</p>
                  <p className="text-muted-foreground">Available in {product.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto_ pt-6 border-t"> {/* Ensure button is at bottom if content is short, or use flex-grow on parent */}
               <Button size="lg" className="w-full">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              {/* Add quantity selector if needed */}
            </div>
          </div>
        </div>
      </Card>

      {/* Related Products or Farmer's Other Products Section (Optional) */}
      {/* <div className="mt-12">
        <h2 className="text-2xl font-headline font-bold mb-4">More from {product.farmerName}</h2>
        ProductGrid component can be reused here
      </div> */}
    </div>
  );
}

