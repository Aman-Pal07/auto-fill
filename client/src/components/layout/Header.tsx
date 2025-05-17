import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <span className="material-icons">menu</span>
      </Button>
      
      <div className="flex-1 px-4 md:px-0 md:ml-4">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <span className="material-icons">notifications</span>
        </Button>
        
        <div className="relative ml-4">
          <Button variant="ghost" className="flex items-center">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" alt="User profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="ml-2 hidden sm:block">John Doe</span>
            <span className="material-icons ml-1 text-muted-foreground">arrow_drop_down</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[270px]">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
}
