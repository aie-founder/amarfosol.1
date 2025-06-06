import PageHeader from '@/components/shared/PageHeader';
import type { Farmer, CropRecord } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, ShieldCheck, Star, CalendarDays, MessageSquare, UserPlus, Leaf, Image as ImageIcon, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data - in a real app, this would be fetched based on params.id
const mockFarmersData: { [id: string]: Farmer } = {
  f1: { 
    id: 'f1', 
    name: 'Abdul Karim', 
    avatarUrl: 'https://placehold.co/150x150.png',
    dataAiHint: "farmer portrait", 
    isVerified: true, 
    location: 'Manikganj', 
    about: 'Abdul Karim has been a cornerstone of Manikganj agriculture for over two decades, specializing in organic vegetables like spinach, carrots, and various gourds. He is also renowned for cultivating traditional rice varieties that are both nutritious and flavorful. Abdul is committed to sustainable farming practices, using natural fertilizers and pest control methods to ensure the health of his land and the quality of his produce. He believes in fair trade and building strong relationships with his customers.',
    galleryImageUrls: [
      'https://placehold.co/600x400.png?a=1',
      'https://placehold.co/600x400.png?a=2',
      'https://placehold.co/600x400.png?a=3',
      'https://placehold.co/600x400.png?a=4',
    ],
    galleryDataAiHints: ["rice paddy", "vegetable patch", "farmer working", "farm landscape"],
    cropHistory: [
      { cropName: 'Spinach', season: 'Winter', year: 2023, quantity: '500 kg' },
      { cropName: 'Aman Rice', season: 'Monsoon', year: 2023, quantity: '2000 kg' },
      { cropName: 'Carrots', season: 'Winter', year: 2022, quantity: '400 kg' },
    ],
    rating: 4.7,
  },
  f2: { 
    id: 'f2', 
    name: 'Fatima Begum', 
    avatarUrl: 'https://placehold.co/150x150.png', 
    dataAiHint: "woman farmer",
    isVerified: true, 
    location: 'Rajshahi', 
    about: 'Fatima Begum is a passionate orchardist from Rajshahi, famous for its delicious mangoes. She cultivates several varieties of mangoes and lychees, employing grafting techniques to enhance fruit quality. Beyond fruits, Fatima is an avid apiarist, producing pure, local honey. She is a strong advocate for women in agriculture and often mentors young aspiring female farmers in her community. Her farm is a model of biodiversity.',
    galleryImageUrls: [
      'https://placehold.co/600x400.png?b=1',
      'https://placehold.co/600x400.png?b=2',
    ],
    galleryDataAiHints: ["mango orchard", "beehives"],
    cropHistory: [
      { cropName: 'Mango (Langra)', season: 'Summer', year: 2023, quantity: '1500 kg' },
      { cropName: 'Lychee', season: 'Summer', year: 2023, quantity: '800 kg' },
      { cropName: 'Honey', season: 'Spring', year: 2023, quantity: '100 kg' },
    ],
    rating: 4.9,
  },
};

// Augment Farmer and GalleryImage types
declare module '@/types' {
  export interface Farmer {
    dataAiHint?: string;
    galleryDataAiHints?: string[];
  }
}


export default function FarmerProfilePage({ params }: { params: { id: string } }) {
  const farmer = mockFarmersData[params.id];

  if (!farmer) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Farmer not found</h1>
        <Link href="/farmers" className="text-primary hover:underline mt-4 inline-block">
          Back to all farmers
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Card className="mb-8 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-b from-primary/20 to-background p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-32 h-32 border-4 border-background shadow-md">
              <AvatarImage src={farmer.avatarUrl} alt={farmer.name} data-ai-hint={farmer.dataAiHint || "person"} />
              <AvatarFallback className="text-4xl">{farmer.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">{farmer.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
                <MapPin className="w-5 h-5" /> <span>{farmer.location}</span>
                {farmer.isVerified && (
                  <Badge variant="default" className="ml-2 bg-green-600 hover:bg-green-700 text-primary-foreground">
                    <ShieldCheck className="w-4 h-4 mr-1" /> Verified Farmer
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex items-center justify-center md:justify-start text-accent">
                {[...Array(Math.floor(farmer.rating))].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                {farmer.rating % 1 !== 0 && <Star key="half" className="w-5 h-5 fill-current opacity-50" />} 
                {[...Array(5 - Math.ceil(farmer.rating))].map((_, i) => <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)}
                <span className="ml-2 text-foreground font-semibold">{farmer.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="md:ml-auto flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
              <Button variant="outline"><MessageSquare className="w-4 h-4 mr-2" /> Message Farmer</Button>
              <Button><UserPlus className="w-4 h-4 mr-2" /> Follow Farmer</Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex mb-6">
          <TabsTrigger value="about" className="text-base"><BookOpen className="w-4 h-4 mr-2 md:hidden lg:inline-block" />About</TabsTrigger>
          <TabsTrigger value="gallery" className="text-base"><ImageIcon className="w-4 h-4 mr-2 md:hidden lg:inline-block" />Farm Gallery</TabsTrigger>
          <TabsTrigger value="history" className="text-base"><Leaf className="w-4 h-4 mr-2 md:hidden lg:inline-block" />Crop History</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">About {farmer.name}</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-foreground/90">
              <p>{farmer.about}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Farm Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              {farmer.galleryImageUrls.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {farmer.galleryImageUrls.map((url, index) => (
                    <div key={index} className="aspect-video relative rounded-md overflow-hidden shadow-md hover:opacity-90 transition-opacity">
                      <Image 
                        src={url} 
                        alt={`${farmer.name}'s farm gallery image ${index + 1}`} 
                        layout="fill" 
                        objectFit="cover"
                        data-ai-hint={farmer.galleryDataAiHints?.[index] || "farm image"} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No gallery images available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Crop History</CardTitle>
            </CardHeader>
            <CardContent>
              {farmer.cropHistory.length > 0 ? (
                <ul className="space-y-4">
                  {farmer.cropHistory.map((crop, index) => (
                    <li key={index} className="p-4 border rounded-md shadow-sm bg-background hover:bg-secondary/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg text-primary">{crop.cropName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {crop.season}, {crop.year}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-base">{crop.quantity}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No crop history available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
