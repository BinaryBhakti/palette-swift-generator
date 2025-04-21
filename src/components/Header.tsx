import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Info, Palette, Layers, ArrowRightLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const location = useLocation();
  const isGradientPage = location.pathname === '/gradient';
  
  return (
    <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-white p-4 flex justify-between items-center z-10">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <Palette className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
          <div>
            <h1 className="font-bold text-xl group-hover:text-primary transition-colors">Palette Swift</h1>
            <p className="text-xs text-white/70">Color palette generator</p>
          </div>
        </Link>
        <ArrowRightLeft className="h-5 w-5 text-white/50" />
        <Link to="/gradient" className="flex items-center gap-2 group">
          <Layers className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
          <div>
            <h1 className="font-bold text-xl group-hover:text-primary transition-colors">Gradient Generator</h1>
            <p className="text-xs text-white/70">CSS gradient creator</p>
          </div>
        </Link>
      </div>
      
      <div className="flex gap-2">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">How to use</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">How to Use</DialogTitle>
              <DialogDescription>
                Generate palettes and gradients, lock colors, and export results.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 my-4 text-sm">
              <p className="text-muted-foreground">
                Click <Palette className="inline h-4 w-4 mx-1"/> <span className="font-semibold">Palette Swift</span> or <Layers className="inline h-4 w-4 mx-1"/> <span className="font-semibold">Gradient Generator</span> in the header to switch modes.
              </p>
              <hr className="border-white/20" />
              <h3 className="font-semibold pt-2">Palette Generator</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-2">
                <li>Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Spacebar</kbd> or click <span className="font-semibold">Generate</span> to create a new palette.</li>
                <li>Click the <span className="font-semibold">Lock</span> icon on a swatch to keep it during generation.</li>
                <li>Switch color formats (HEX, RGB, HSL) using the selector.</li>
                <li>Click the <span className="font-semibold">Copy</span> icon on a swatch to copy its code.</li>
                <li>Click <span className="font-semibold">Export</span> to save or share the palette.</li>
              </ol>

              <hr className="border-white/20" />
              <h3 className="font-semibold pt-2">Gradient Generator</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-2">
                <li>Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Spacebar</kbd> or click <span className="font-semibold">Generate Gradient</span> to create a new gradient.</li>
                <li>Click <span className="font-semibold">Export CSS</span> to view and copy the CSS code for the gradient.</li>
              </ol>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">
            {isGradientPage ? 'Save Gradient' : 'Save Palette'}
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
