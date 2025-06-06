import PageHeader from '@/components/shared/PageHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LifeBuoy, MessageSquare, Send, Smartphone, UserCheck, Users, CreditCard, ShoppingBag, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqItems = [
  {
    value: "item-1",
    question: "How do I register as a farmer?",
    answer: "You can register as a farmer by visiting the 'Join as a Farmer' page and filling out the registration form. You'll need to provide your NID, mobile number, and farm location details. Our team will review your application and get back to you.",
    icon: UserCheck,
  },
  {
    value: "item-2",
    question: "What payment methods are accepted?",
    answer: "We support various payment methods including Mobile Banking (bKash, Nagad), Card payments (Visa, MasterCard), and Cash on Delivery (COD) for select areas and products.",
    icon: CreditCard,
  },
  {
    value: "item-3",
    question: "How can I track my order?",
    answer: "Once your order is confirmed, you will receive tracking information via SMS and email. You can also track your order status from your account dashboard on our platform.",
    icon: ShoppingBag,
  },
  {
    value: "item-4",
    question: "How does volunteering work?",
    answer: "Volunteers can create a profile listing their skills and availability. They can then browse farms needing help and request volunteering slots. It's a great way to gain hands-on farming experience and support local agriculture.",
    icon: Users,
  },
  {
    value: "item-5",
    question: "Is there a mobile app?",
    answer: "Yes, we have a mobile app available for both Android and iOS. We also support USSD access for farmers who may not have smartphones.",
    icon: Smartphone,
  },
];

export default function HelpPage() {
  return (
    <div>
      <PageHeader
        title="Help Center"
        description="Find answers to your questions or get in touch with our support team."
        icon={LifeBuoy}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <MessageSquare className="w-12 h-12 text-primary mb-2" />
            <CardTitle className="font-headline text-xl">Live Chat / WhatsApp</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Get instant support from our team.</p>
            <Button className="w-full mb-2" disabled>Live Chat (Coming Soon)</Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank">Chat on WhatsApp</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <HelpCircle className="w-12 h-12 text-primary mb-2" />
            <CardTitle className="font-headline text-xl">FAQ</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Find quick answers to common questions.</p>
            <Button variant="outline" className="w-full" asChild>
                <Link href="#faq-section">Browse FAQs</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <Send className="w-12 h-12 text-primary mb-2" />
            <CardTitle className="font-headline text-xl">Email Support</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Send us an email for detailed queries.</p>
            <Button variant="outline" className="w-full" asChild>
                <Link href="mailto:support@agriconnect.com">Email Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <section id="faq-section" className="mb-12">
        <h2 className="text-2xl font-headline font-bold mb-6 text-center md:text-left">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem value={item.value} key={item.value} className="border-b">
              <AccordionTrigger className="text-lg hover:no-underline py-4">
                <div className="flex items-center">
                  {item.icon && <item.icon className="w-5 h-5 mr-3 text-primary flex-shrink-0" />}
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80 pb-4 pl-8">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-6 text-center md:text-left">Still Need Help? Contact Us</h2>
        <Card className="max-w-2xl mx-auto shadow-xl">
            <CardHeader>
                <CardTitle className="font-headline">Send us a Message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-1">Your Name</label>
                    <Input id="contact-name" placeholder="John Doe" />
                </div>
                 <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1">Your Email</label>
                    <Input id="contact-email" type="email" placeholder="you@example.com" />
                </div>
                 <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium mb-1">Subject</label>
                    <Input id="contact-subject" placeholder="e.g., Question about product listing" />
                </div>
                <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea id="contact-message" placeholder="Your message..." rows={5}/>
                </div>
                <Button className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2"/> Send Message
                </Button>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}
