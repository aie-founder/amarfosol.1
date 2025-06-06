import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

export default function FarmerJoinPage() {
  return (
    <div>
      <PageHeader
        title="Join as a Farmer"
        description="Become a part of the Amarfosol.com community and sell your produce directly to consumers."
        icon={Users}
      />
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Why Sell with Amarfosol.com?</CardTitle>
            <CardDescription>
              Reach a wider audience, get fair prices, and manage your sales efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span><strong>Direct Market Access:</strong> Connect directly with consumers and businesses, eliminating intermediaries.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span><strong>Fair Pricing:</strong> Set your own prices and enjoy better profit margins for your hard work.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span><strong>Easy Product Listing:</strong> Showcase your products with photos, harvest dates, and detailed descriptions.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span><strong>Secure Payments:</strong> Receive payments quickly and securely through various methods.</span>
              </li>
               <li className="flex items-start">
                <ShieldCheck className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span><strong>Verified Profiles:</strong> Build trust with consumers through our KYC validation process.</span>
              </li>
            </ul>
            
            <div className="pt-4 text-center">
                <p className="text-lg font-semibold mb-4">Ready to grow your business?</p>
                <Button size="lg" asChild>
                    <Link href="/farmers/register">Start Your Registration</Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                    Have questions? <Link href="/help" className="text-primary hover:underline">Contact our support team</Link>.
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
