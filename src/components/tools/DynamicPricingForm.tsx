'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestOptimalPrice, type SuggestOptimalPriceInput, type SuggestOptimalPriceOutput } from '@/ai/flows/dynamic-pricing-tool';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  season: z.enum(["Spring", "Summer", "Autumn", "Winter"], { required_error: "Please select a season." }),
  surplus: z.enum(["low", "medium", "high"], { required_error: "Please select a surplus level." }),
  urgency: z.enum(["low", "medium", "high"], { required_error: "Please select urgency level." }),
  currentPrice: z.coerce.number().positive({ message: "Current price must be a positive number." }),
});

type FormData = z.infer<typeof formSchema>;

export default function DynamicPricingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestOptimalPriceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      currentPrice: 0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const suggestion = await suggestOptimalPrice(data as SuggestOptimalPriceInput);
      setResult(suggestion);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
      console.error("Error fetching price suggestion:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Price Suggestion Form
            </CardTitle>
            <CardDescription>Enter product details to get a dynamic price recommendation in BDT.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fresh Tomatoes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Season</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Spring">Spring</SelectItem>
                        <SelectItem value="Summer">Summer</SelectItem>
                        <SelectItem value="Autumn">Autumn</SelectItem>
                        <SelectItem value="Winter">Winter</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Price (BDT)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 250" {...field} step="1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="surplus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surplus Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select surplus level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency to Sell</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get Price Suggestion
            </Button>
          </CardFooter>
        </form>
      </Form>

      {error && (
        <div className="p-4 pt-0">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {result && (
        <div className="p-4 pt-0">
          <Alert variant="default" className="bg-primary/10 border-primary/30">
            <TrendingUp className="h-5 w-5 text-primary" />
            <AlertTitle className="font-headline text-xl text-primary">Price Suggestion (BDT)</AlertTitle>
            <AlertDescription className="mt-2 space-y-2 text-foreground/90">
              <p className="text-2xl font-bold">
                Suggested Price: ৳{result.suggestedPrice.toFixed(2)}
              </p>
              <p><span className="font-semibold">Reasoning:</span> {result.reasoning}</p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
