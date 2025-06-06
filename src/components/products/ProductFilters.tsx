'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter, RotateCcw } from 'lucide-react';

const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Other'];
const ratings = [
  { value: '0', label: 'Any Rating' },
  { value: '4', label: '4 Stars & Up' },
  { value: '3', label: '3 Stars & Up' },
  { value: '2', label: '2 Stars & Up' },
  { value: '1', label: '1 Star & Up' },
];

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]); // Default price range
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedRating, setSelectedRating] = useState(searchParams.get('rating') || '0');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory && selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    // params.set('minPrice', priceRange[0].toString());
    // params.set('maxPrice', priceRange[1].toString());
    if (location) {
      params.set('location', location);
    } else {
      params.delete('location');
    }
    if (selectedRating && selectedRating !== '0') {
      params.set('rating', selectedRating);
    } else {
      params.delete('rating');
    }
    // Debounce or apply on button click to avoid too many re-renders
    // For now, apply immediately
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

  }, [selectedCategory, priceRange, location, selectedRating, pathname, router, searchParams]);


  const handleResetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 100]);
    setLocation('');
    setSelectedRating('0');
    router.replace(pathname, { scroll: false });
  };

  return (
    <Card className="sticky top-20 shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-xl font-headline">
          <Filter className="w-5 h-5 text-primary" />
          Filter Products
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <Label htmlFor="category" className="text-base font-semibold mb-2 block">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-semibold mb-2 block">Price Range</Label>
          <Slider
            defaultValue={[0, 100]} // Use this for initial display only
            value={priceRange}
            min={0}
            max={100} // Max price, can be dynamic
            step={1}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div>
          <Label htmlFor="location" className="text-base font-semibold mb-2 block">Location (District)</Label>
          <Input 
            id="location" 
            placeholder="e.g., Dhaka, Chittagong" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="rating" className="text-base font-semibold mb-2 block">Rating</Label>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger id="rating">
              <SelectValue placeholder="Select minimum rating" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((r) => (
                <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleResetFilters} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
