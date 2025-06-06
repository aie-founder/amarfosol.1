import PageHeader from '@/components/shared/PageHeader';
import DynamicPricingForm from '@/components/tools/DynamicPricingForm';
import { Sparkles } from 'lucide-react';

export default function DynamicPricingPage() {
  return (
    <div>
      <PageHeader 
        title="Dynamic Pricing Tool" 
        description="Get AI-powered suggestions for optimal product pricing based on market conditions."
        icon={Sparkles}
      />
      <div className="max-w-2xl mx-auto">
        <DynamicPricingForm />
      </div>
    </div>
  );
}
