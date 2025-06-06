import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Tag, ShoppingCart, Leaf } from 'lucide-react';
import type { Product } from '@/types';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

function timeSince(dateString: string): string {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  if (seconds < 10) return "just now";
  return Math.floor(seconds) + " seconds ago";
}


export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block aspect-square relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 transition-transform duration-300"
            data-ai-hint={product.dataAiHint || product.name.toLowerCase()}
          />
        </Link>
        <Badge variant="secondary" className="absolute top-2 right-2 capitalize">{product.category}</Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1 truncate group-hover:text-primary">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 flex items-center">
          <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {product.location}
        </CardDescription>
         <CardDescription className="text-xs text-muted-foreground mb-3">
          Harvested: {timeSince(product.harvestDate)}
        </CardDescription>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-semibold text-primary flex items-center">
            <Tag className="w-4 h-4 mr-1.5 text-primary/80" /> ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-accent fill-accent mr-1" />
            <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <Link href={`/farmers/${product.farmerId}`} className="text-sm text-primary hover:underline">
          By {product.farmerName}
        </Link>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>
            <ShoppingCart className="mr-2 h-4 w-4" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
