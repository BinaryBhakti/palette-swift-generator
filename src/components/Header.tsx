
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Info } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-white p-4 flex justify-between items-center z-10">
      <div>
        <h1 className="font-bold text-xl">Palette Swift</h1>
        <p className="text-xs text-white/70">Color palette generator</p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">How to use</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Save palette</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
