import PageHeader from '@/components/shared/PageHeader';
import type { Farmer } from '@/types';
import { Users, Star, MapPin, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const mockFarmers: Farmer[] = [
  { 
    id: 'f1', 
    name: 'Abdul Karim', 
    avatarUrl: 'https://placehold.co/100x100.png', 
    isVerified: true, 
    location: 'Manikganj', 
    about: 'Specializing in organic vegetables and traditional rice varieties for over 20 years.', 
    galleryImageUrls: [], 
    cropHistory: [],
    rating: 4.7,
    dataAiHint: "farmer portrait"
  },
  { 
    id: 'f2', 
    name: 'Fatima Begum', 
    avatarUrl: 'https://placehold.co/100x100.png', 
    isVerified: true, 
    location: 'Rajshahi', 
    about: 'Passionate about fruit orchards, especially mangoes and lychees. Also an apiarist.', 
    galleryImageUrls: [], 
    cropHistory: [],
    rating: 4.9,
    dataAiHint: "woman farmer"
  },
  { 
    id: 'f3', 
    name: 'Rahim Sheikh', 
    avatarUrl: 'https://placehold.co/100x100.png', 
    isVerified: false, 
    location: 'Gazipur', 
    about: 'Modern farming techniques for high-yield greenhouse vegetables like tomatoes and capsicums.', 
    galleryImageUrls: [], 
    cropHistory: [],
    rating: 4.2,
    dataAiHint: "farmer field"
  },
];

// Augment Farmer type
declare module '@/types' {
  export interface Farmer {
    dataAiHint?: string;
  }
}

export default function FarmersPage() {
  return (
    <div>
      <PageHeader 
        title="Our Farmers" 
        description="Meet the dedicated individuals growing your food with care and passion." 
        icon={Users} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFarmers.map(farmer => (
          <Link href={`/farmers/${farmer.id}`} key={farmer.id} className="group">
            <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Avatar className="h-20 w-20 border-2 border-primary">
                  <AvatarImage src={farmer.avatarUrl} alt={farmer.name} data-ai-hint={farmer.dataAiHint || "person"} />
                  <AvatarFallback>{farmer.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{farmer.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4 mr-1" /> {farmer.location}
                  </div>
                  {farmer.isVerified && (
                    <Badge variant="default" className="mt-1 bg-green-600 hover:bg-green-700">
                      <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription className="line-clamp-3 text-foreground/80">{farmer.about}</CardDescription>
                <div className="mt-3 flex items-center">
                  <Star className="w-5 h-5 text-accent fill-accent mr-1" /> 
                  <span className="font-semibold">{farmer.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground ml-1">(Farmer Rating)</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
