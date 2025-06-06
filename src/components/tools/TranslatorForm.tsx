'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { translateToBengali, type TranslateTextInput, type TranslateTextOutput } from '@/ai/flows/translate-text-flow';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Languages, AlertCircle, ArrowRightLeft } from 'lucide-react';

const formSchema = z.object({
  englishText: z.string().min(1, { message: "Please enter some text to translate." }),
});

type FormData = z.infer<typeof formSchema>;

export default function TranslatorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranslateTextOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      englishText: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const translation = await translateToBengali({ textToTranslate: data.englishText });
      setResult(translation);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred during translation.");
      console.error("Error fetching translation:", e);
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
              <ArrowRightLeft className="w-6 h-6 text-primary" />
              Translate Text
            </CardTitle>
            <CardDescription>Enter English text below to translate it into Bengali.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="englishText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter English text here..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Languages className="mr-2 h-4 w-4" />
              )}
              Translate to Bangla
            </Button>
          </CardFooter>
        </form>
      </Form>

      {error && (
        <div className="p-4 pt-0 mt-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Translation Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {result && (
        <div className="p-4 pt-0 mt-4">
          <Alert variant="default" className="bg-primary/10 border-primary/30">
            <Languages className="h-5 w-5 text-primary" />
            <AlertTitle className="font-headline text-xl text-primary">Bengali Translation</AlertTitle>
            <AlertDescription className="mt-2 space-y-2 text-foreground/90">
              <p className="text-lg" style={{ fontFamily: "'Noto Sans Bengali', var(--font-sans)" }}>
                {result.translatedText}
              </p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
