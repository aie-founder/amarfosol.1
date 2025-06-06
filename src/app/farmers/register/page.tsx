import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, UserPlus } from 'lucide-react';

// This is a placeholder form. A real implementation would use react-hook-form and validation.
export default function FarmerRegisterPage() {
  return (
    <div>
      <PageHeader
        title="Farmer Registration"
        description="Please fill out the form below to start selling on AgriConnect."
        icon={UserPlus}
      />
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Farm Details</CardTitle>
          <CardDescription>Provide accurate information to help us verify your profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Enter your full name" />
            </div>
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input id="mobileNumber" type="tel" placeholder="Enter your mobile number" />
            </div>
          </div>
          <div>
            <Label htmlFor="nidNumber">NID Number</Label>
            <Input id="nidNumber" placeholder="Enter your National ID number" />
          </div>
           <div>
            <Label htmlFor="farmName">Farm Name (Optional)</Label>
            <Input id="farmName" placeholder="e.g., Karim's Organic Farm" />
          </div>
          <div>
            <Label htmlFor="farmLocation">Farm Location (District, Upazila)</Label>
            <Input id="farmLocation" placeholder="e.g., Manikganj Sadar, Manikganj" />
          </div>
          <div>
            <Label htmlFor="farmDescription">About Your Farm & Products</Label>
            <Textarea id="farmDescription" placeholder="Tell us about your farm, what you grow, and your farming practices." rows={4}/>
          </div>
          <div>
            <Label htmlFor="nidUpload">Upload NID Scan/Photo</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="flex text-sm text-muted-foreground">
                    <label
                        htmlFor="nid-upload-input"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                    >
                        <span>Upload a file</span>
                        <input id="nid-upload-input" name="nid-upload-input" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 5MB</p>
                </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" size="lg">
            Submit Registration Application
          </Button>
        </CardFooter>
      </Card>
      <p className="text-center mt-4 text-sm text-muted-foreground">
        Your application will be reviewed by our team. We'll contact you within 2-3 business days.
      </p>
    </div>
  );
}
