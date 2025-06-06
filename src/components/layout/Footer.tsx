export default function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Amarfosol.com. All rights reserved.</p>
        <p className="text-sm mt-1">Amarfosol.com a concern AIEGrowTech</p>
      </div>
    </footer>
  );
}
