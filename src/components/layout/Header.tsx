import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Leaf, Languages } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/farmers', label: 'Farmers' },
  { href: '/tools/dynamic-pricing', label: 'Pricing Tool' },
  { href: '/tools/translator', label: 'Translator' },
  { href: '/chat', label: 'Chat' },
];

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Leaf className="w-8 h-8" />
          <span className="text-2xl font-headline font-bold">Amarfosol.com</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href} className="font-semibold text-foreground/80 hover:text-primary px-3 py-2 text-sm">
                {item.label === 'Translator' && <Languages className="w-4 h-4 mr-1.5 md:hidden lg:inline-block" />}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button key={item.href} variant="ghost" asChild className="justify-start">
                    <Link href={item.href} className="text-lg font-semibold text-foreground/80 hover:text-primary flex items-center gap-2">
                      {item.label === 'Translator' && <Languages className="w-5 h-5" />}
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
