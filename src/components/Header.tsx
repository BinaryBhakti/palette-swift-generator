
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Info } from 'lucide-react';
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
  
  return (
    <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-white p-4 flex justify-between items-center z-10">
      <div>
        <h1 className="font-bold text-xl">Palette Swift</h1>
        <p className="text-xs text-white/70">Color palette generator</p>
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
              <DialogTitle className="text-xl font-bold">How to Use Palette Swift</DialogTitle>
              <DialogDescription>
                Create and customize beautiful color palettes in seconds
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 my-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Generate Palettes</h3>
                  <p className="text-sm text-muted-foreground">Press the spacebar or click the "Generate" button to create a new palette.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Lock Colors</h3>
                  <p className="text-sm text-muted-foreground">Click the lock icon on any swatch to keep that color when generating new palettes. Click again to unlock.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Change Color Format</h3>
                  <p className="text-sm text-muted-foreground">Switch between HEX, RGB, and HSL formats using the format selector.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Copy Colors</h3>
                  <p className="text-sm text-muted-foreground">Click the copy icon on any swatch to copy its color code to your clipboard.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <span className="font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Export Palette</h3>
                  <p className="text-sm text-muted-foreground">Click the "Export" button to save or share your palette.</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Save palette</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
