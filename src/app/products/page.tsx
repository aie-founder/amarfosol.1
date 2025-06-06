import ProductFilters from '@/components/products/ProductFilters';
import ProductGrid from '@/components/products/ProductGrid';
import PageHeader from '@/components/shared/PageHeader';
import type { Product } from '@/types';
import { ShoppingBag } from 'lucide-react';

// Mock data for products
const mockProducts: Product[] = [
  { id: '1', name: 'Fresh Spinach', category: 'Vegetables', price: 2.50, imageUrl: 'https://placehold.co/300x300.png', farmerId: 'f1', farmerName: 'Abdul Karim', location: 'Manikganj', rating: 4.5, harvestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: 'Organic spinach, freshly harvested.' , dataAiHint: 'spinach bunch'},
  { id: '2', name: 'Ripe Mangoes ( सीजनल )', category: 'Fruits', price: 5.00, imageUrl: 'https://placehold.co/300x300.png', farmerId: 'f2', farmerName: 'Fatima Begum', location: 'Rajshahi', rating: 5, harvestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), description: 'Sweet and juicy seasonal mangoes.', dataAiHint: 'mangoes basket' },
  { id: '3', name: 'Brown Rice', category: 'Grains', price: 3.00, imageUrl: 'https://placehold.co/300x300.png', farmerId: 'f1', farmerName: 'Abdul Karim', location: 'Dinajpur', rating: 4, harvestDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), description: 'Nutritious whole grain brown rice.', dataAiHint: 'rice sack' },
  { id: '4', name: 'Cherry Tomatoes', category: 'Vegetables', price: 3.50, imageUrl: 'https://placehold.co/300x300.png', farmerId: 'f3', farmerName: 'Rahim Sheikh', location: 'Gazipur', rating: 4.2, harvestDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString(), description: 'Sweet cherry tomatoes, perfect for salads.', dataAiHint: 'tomatoes vine' },
  { id: '5', name: 'Local Honey', category: 'Other', price: 8.00, imageUrl: 'https://placehold.co/300x300.png', farmerId: 'f2', farmerName: 'Fatima Begum', location: 'Sundarbans', rating: 4.8, harvestDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), description: 'Pure, unprocessed local honey.', dataAiHint: 'honey jar' },
  { id: '6', name: 'Fresh Carrots', category: 'Vegetables', price: 1.80, imageUrl: 'https://placehold.co/300x300.png', farmerId: 'f1', farmerName: 'Abdul Karim', location: 'Manikganj', rating: 4.3, harvestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), description: 'Crisp and sweet carrots.', dataAiHint: 'carrots bunch' },
];

// Augment Product type for this component
declare module '@/types' {
  export interface Product {
    dataAiHint?: string;
  }
}


export default function ProductsPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  // Simple filtering logic based on searchParams (can be expanded)
  const filteredProducts = mockProducts.filter(product => {
    const categoryMatch = searchParams?.category ? product.category.toLowerCase() === (searchParams.category as string).toLowerCase() : true;
    // Add more filters here based on price, location, rating as ProductFilters is developed
    const locationMatch = searchParams?.location ? product.location.toLowerCase().includes((searchParams.location as string).toLowerCase()) : true;
    return categoryMatch && locationMatch;
  });

  return (
    <div>
      <PageHeader title="Our Products" description="Browse fresh, locally sourced produce from our trusted farmers." icon={ShoppingBag}/>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <ProductFilters />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
